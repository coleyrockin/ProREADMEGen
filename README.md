# ProREADMEGen

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat&logo=node.js&logoColor=white)
![Tests](https://img.shields.io/badge/tests-node:test-blue?style=flat)
![Dependencies](https://img.shields.io/badge/runtime_deps-0-success?style=flat)

Small Node.js CLI for generating a cleaner project README without external runtime dependencies.

## What changed in v0.5

- Removed `inquirer` and its vulnerable transitive dependency tree.
- Added overwrite protection with `--force`.
- Restricted custom output paths to the current working directory.
- Cleaned up Markdown generation so optional sections are omitted instead of rendering `undefined`.
- Added tests with the built-in `node:test` runner.

## Usage

```bash
node index.js
```

```bash
node index.js --output README.generated.md
```

```bash
node index.js --output README.generated.md --force
```

## Options

- `--output <file>` writes to a file inside the current directory.
- `--force` allows overwriting an existing file.
- `--help` prints the CLI help text.

## Testing

```bash
npm test
```
