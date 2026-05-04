const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  DEFAULT_OUTPUT,
  resolveOutputPath,
  writeFileSafely,
} = require('../utils/outputFile');

test('resolveOutputPath defaults to a generated README inside the current directory', () => {
  const cwd = path.join(os.tmpdir(), 'pro-readme-default');
  const resolved = resolveOutputPath(undefined, cwd);

  assert.equal(resolved, path.join(cwd, DEFAULT_OUTPUT));
});

test('resolveOutputPath rejects paths outside the current directory', () => {
  const cwd = path.join(os.tmpdir(), 'pro-readme-safe-root');

  assert.throws(
    () => resolveOutputPath('../README.md', cwd),
    /inside the current directory/
  );
});

test('writeFileSafely refuses to overwrite unless force is true', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pro-readme-'));
  const target = path.join(tempDir, 'README.generated.md');

  await fs.writeFile(target, 'existing file\n', 'utf8');

  await assert.rejects(
    () => writeFileSafely(target, 'new file\n', { force: false }),
    /already exists/
  );

  await writeFileSafely(target, 'new file\n', { force: true });
  assert.equal(await fs.readFile(target, 'utf8'), 'new file\n');
});
