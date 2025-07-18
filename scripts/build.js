#!/usr/bin/env node

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Parse command line arguments
const args = process.argv.slice(2);
const flags = {
  android: args.includes("--android") || args.includes("-a"),
  dev: args.includes("--dev") || args.includes("-d"),
  help: args.includes("--help") || args.includes("-h"),
};

function showHelp() {
  console.log(`
Usage: node scripts/build.js [options]

Options:
  --android, -a    Build for Android platform
  --dev, -d        Build in development mode
  --help, -h       Show this help message

Examples:
  node scripts/build.js                 # Build web only
  node scripts/build.js --android       # Build web and Android
  node scripts/build.js --dev --android # Build in dev mode for Android
  `);
}

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(" ")}`);

    const child = spawn(command, args, {
      stdio: "inherit",
      cwd: projectRoot,
      shell: true,
      ...options,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function buildWeb() {
  console.log("Building web application...");

  const buildCommand = flags.dev ? "build:dev" : "build";
  await runCommand("npm", ["run", buildCommand]);

  console.log("Web build completed");
}

async function syncCapacitor() {
  console.log("Syncing Capacitor...");

  if (flags.android) {
    await runCommand("npx", ["cap", "sync", "android"]);
  } else {
    await runCommand("npx", ["cap", "sync"]);
  }

  console.log("Capacitor sync completed");
}

async function buildAndroid() {
  console.log("Building Android application...");

  await runCommand("npx", ["cap", "build", "android"]);

  console.log("Android build completed");
}

async function main() {
  if (flags.help) {
    showHelp();
    return;
  }

  try {
    console.log("Starting build process...");

    if (flags.android) {
      console.log("Android build enabled");
    } else {
      console.log("Web-only build");
    }

    await buildWeb();
    await syncCapacitor();

    if (flags.android) {
      await buildAndroid();
    }

    console.log("Build process completed successfully!");
  } catch (error) {
    console.error("Build failed:", error.message);
    process.exit(1);
  }
}

main();
