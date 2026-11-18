import { execFile } from "node:child_process"
import { access, mkdir, mkdtemp, readFile, writeFile, rm } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const roverDir = path.join(root, "public", "rover")
const envFile = path.join(root, "rover-assets.env")
const files = ["app.enc.json", "milo.jpg", "prd.pdf"]

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function allPresent() {
  for (const file of files) {
    if (!(await exists(path.join(roverDir, file)))) return false
  }
  return true
}

function parseEnvValue(text, key) {
  const match = text.match(new RegExp(`(?:^|\\n)${key}=([^\\n]*)`))
  return match ? match[1].trim() : ""
}

async function loadArchiveB64() {
  if (process.env.ROVER_ASSETS_TAR_B64) {
    return process.env.ROVER_ASSETS_TAR_B64
  }
  if (await exists(envFile)) {
    const text = await readFile(envFile, "utf8")
    return parseEnvValue(text, "ROVER_ASSETS_TAR_B64")
  }
  return ""
}

async function extractArchive(archiveB64) {
  const buffer = Buffer.from(archiveB64.replace(/\s+/g, ""), "base64")
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "rover-assets-"))
  const archivePath = path.join(tempDir, "rover-assets.tar.gz")
  try {
    await writeFile(archivePath, buffer)
    await execFileAsync("tar", ["-xzf", archivePath, "-C", roverDir])
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

await mkdir(roverDir, { recursive: true })

const archiveB64 = await loadArchiveB64()
if (archiveB64) {
  await extractArchive(archiveB64)
  console.log("Restored Rover private assets from ROVER_ASSETS_TAR_B64")
} else if (await allPresent()) {
  console.log("Keeping existing Rover private assets in public/rover/")
} else {
  for (const file of files) {
    if (!(await exists(path.join(roverDir, file)))) {
      console.warn(`Missing public/rover/${file}`)
    }
  }
  console.warn(
    "Rover private assets are not available. Run npm run rover:encode, add rover-assets.env on Render, or keep local copies under public/rover/.",
  )
}
