#!/usr/bin/env node

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const args = process.argv.slice(2);
const flags = {
  android: args.includes("--android") || args.includes("-a"),
  dev: args.includes("--dev") || args.includes("-d"),
  help: args.includes("--help") || args.includes("-h"),
};

function showHelp() {
  console.log(`
Usage: node scripts/run.js [options]

Options:
  --android, -a         Run on Android platform
  --dev, -d             Build in development mode
  --help, -h            Show this help message

Examples:
  node scripts/run.js                         # Run web dev server only
  node scripts/run.js --android               # Build and run on Android
  node scripts/run.js --dev --android         # Build in dev mode and run on Android
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

async function runAndroid() {
  console.log("Running Android application...");

  const runArgs = ["cap", "run", "android"];
  await runCommand("npx", runArgs);

  console.log("Android app launched");
}

async function runWebDev() {
  console.log("Starting web development server...");

  await runCommand("npm", ["run", "dev"]);
}

async function main() {
  if (flags.help) {
    showHelp();
    return;
  }

  try {
    console.log("Starting run process...");

    if (flags.android) {
      console.log("Android run enabled");

      await buildWeb();
      await syncCapacitor();

      await runAndroid();
    } else {
      console.log("Starting web development server...");
      await runWebDev();
    }

    console.log("Run process completed successfully!");
  } catch (error) {
    console.error("Run failed:", error.message);
    process.exit(1);
  }
}

main();
