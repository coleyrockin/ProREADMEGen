const fs = require('node:fs/promises');
const path = require('node:path');

const DEFAULT_OUTPUT = 'README.generated.md';

function resolveOutputPath(outputFile, cwd = process.cwd()) {
  const root = path.resolve(cwd);
  const requested = outputFile || DEFAULT_OUTPUT;
  const resolved = path.resolve(root, requested);
  const relative = path.relative(root, resolved);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Output path must stay inside the current directory.');
  }

  return resolved;
}

async function writeFileSafely(filePath, data, options = {}) {
  const { force = false } = options;

  if (!force) {
    try {
      await fs.access(filePath);
      throw new Error(`Refusing to overwrite ${path.basename(filePath)} because it already exists. Re-run with --force to replace it.`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  await fs.writeFile(filePath, data, 'utf8');
}

module.exports = {
  DEFAULT_OUTPUT,
  resolveOutputPath,
  writeFileSafely,
};
