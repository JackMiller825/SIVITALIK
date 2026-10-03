import { execFileSync } from "node:child_process";
import { chmod, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const stage = path.join(root, ".release");
const standalone = path.join(root, ".next", "standalone");
const zipPath = path.join(root, "public", "superintelligent-vitalik-build.zip");

const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
const builtAt = new Date().toISOString();

await mkdir(path.join(standalone), { recursive: false }).catch(() => {});
await readFile(path.join(standalone, "server.js"));

await rm(stage, { recursive: true, force: true });
await cp(standalone, stage, { recursive: true });
await mkdir(path.join(stage, ".next"), { recursive: true });
await cp(path.join(root, ".next", "static"), path.join(stage, ".next", "static"), { recursive: true });

const publicSrc = path.join(root, "public");
const publicDest = path.join(stage, "public");
await rm(publicDest, { recursive: true, force: true });
await cp(publicSrc, publicDest, {
  recursive: true,
  filter(source) {
    const base = path.basename(source);
    return base !== "superintelligent-vitalik-build.zip" && base !== "superintelligent-vitalik-source.zip";
  },
});

const notes = [
  "Superintelligent Vitalik",
  `version: ${pkg.version}`,
  `commit: ${commit}`,
  `built: ${builtAt}`,
  "",
  "Unzip this archive and start the site:",
  "",
  "  node server.js",
  "",
  "The server listens on PORT (default 3000) and HOSTNAME (default 0.0.0.0).",
  "Example: PORT=38471 node server.js",
  "",
].join("\n");
await writeFile(path.join(stage, "BUILD.txt"), notes);
const startScript = path.join(stage, "start.sh");
await writeFile(startScript, "#!/bin/sh\nexport HOSTNAME=\"${HOSTNAME:-0.0.0.0}\"\nexport PORT=\"${PORT:-3000}\"\nexec node server.js\n");
await chmod(startScript, 0o755);

await rm(zipPath, { force: true });
execFileSync("zip", ["-qr", zipPath, "."], { cwd: stage, stdio: "inherit" });
await rm(stage, { recursive: true, force: true });

const bytes = (await readFile(zipPath)).byteLength;
console.log(`Wrote ${zipPath} (${bytes} bytes), version ${pkg.version}, commit ${commit}`);
