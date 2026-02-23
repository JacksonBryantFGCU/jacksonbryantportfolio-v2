#!/usr/bin/env node
/**
 * Fixes Rollup native binding installation on Windows when using Git Bash/MSYS.
 * npm incorrectly detects the platform as Linux in MSYS environments, so we
 * manually install the correct Windows native binding.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const rollupBindingsPath = path.join(__dirname, '..', 'node_modules', '@rollup');

// Get the actual platform (os.platform() returns correct value regardless of shell)
const platform = os.platform();
const arch = os.arch();

console.log(`[fix-rollup] Detected platform: ${platform}, arch: ${arch}`);

// Define which binding is needed for each platform
const bindings = {
  'win32-x64': '@rollup/rollup-win32-x64-msvc',
  'win32-arm64': '@rollup/rollup-win32-arm64-msvc',
  'darwin-x64': '@rollup/rollup-darwin-x64',
  'darwin-arm64': '@rollup/rollup-darwin-arm64',
  'linux-x64': '@rollup/rollup-linux-x64-gnu',
};

const key = `${platform}-${arch}`;
const requiredBinding = bindings[key];

if (!requiredBinding) {
  console.log(`[fix-rollup] No binding configured for ${key}, skipping.`);
  process.exit(0);
}

const bindingDir = path.join(rollupBindingsPath, requiredBinding.replace('@rollup/', ''));

if (fs.existsSync(bindingDir)) {
  console.log(`[fix-rollup] Binding ${requiredBinding} already installed.`);
  process.exit(0);
}

console.log(`[fix-rollup] Installing ${requiredBinding}...`);

try {
  // Use npm pack to download the package, then extract it
  const tempDir = path.join(__dirname, '..', '.rollup-temp');
  fs.mkdirSync(tempDir, { recursive: true });

  execSync(`npm pack ${requiredBinding} --pack-destination "${tempDir}"`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });

  // Find the tarball
  const tarballs = fs.readdirSync(tempDir).filter(f => f.endsWith('.tgz'));
  if (tarballs.length === 0) {
    throw new Error('No tarball found after npm pack');
  }

  const tarball = path.join(tempDir, tarballs[0]);

  // Extract to a temp location
  execSync(`tar -xzf "${tarball}" -C "${tempDir}"`, { stdio: 'inherit' });

  // Move to node_modules/@rollup
  fs.mkdirSync(rollupBindingsPath, { recursive: true });
  const packageDir = path.join(tempDir, 'package');

  // Copy files
  fs.cpSync(packageDir, bindingDir, { recursive: true });

  // Cleanup
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`[fix-rollup] Successfully installed ${requiredBinding}`);
} catch (error) {
  console.error(`[fix-rollup] Failed to install binding:`, error.message);
  process.exit(1);
}
