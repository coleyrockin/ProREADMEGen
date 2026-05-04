const path = require('node:path');
const { parseArgs } = require('node:util');
const { stdin: input, stdout: output } = require('node:process');
const readline = require('node:readline/promises');

const { generateMarkdown, LICENSE_OPTIONS } = require('./utils/generateMarkdown');
const {
  DEFAULT_OUTPUT,
  resolveOutputPath,
  writeFileSafely,
} = require('./utils/outputFile');

function printHelp() {
  console.log(`ProREADMEGen v0.5

Usage:
  node index.js [--output README.generated.md] [--force]

Options:
  --output <file>  Write to a file inside the current directory.
  --force          Overwrite the output file if it already exists.
  --help           Show this message.
`);
}

function normalizeRequired(value, fieldName) {
  const normalized = value.trim();
  if (!normalized) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalized;
}

function normalizeLicense(value) {
  const normalized = value.trim();
  if (!normalized) {
    return 'No License';
  }

  const selected = LICENSE_OPTIONS.find(
    option => option.toLowerCase() === normalized.toLowerCase()
  );

  if (!selected) {
    throw new Error(`License must be one of: ${LICENSE_OPTIONS.join(', ')}`);
  }

  return selected;
}

async function promptForAnswers() {
  const rl = readline.createInterface({ input, output });

  try {
    const title = normalizeRequired(
      await rl.question('Project title: '),
      'Project title'
    );
    const description = normalizeRequired(
      await rl.question('Description: '),
      'Description'
    );
    const installation = (await rl.question('Installation instructions (optional): ')).trim();
    const usage = (await rl.question('Usage instructions (optional): ')).trim();
    const contribution = (await rl.question('Contribution guidelines (optional): ')).trim();
    const testing = (await rl.question('Testing instructions (optional): ')).trim();
    const license = normalizeLicense(
      await rl.question(
        `License [${LICENSE_OPTIONS.join(', ')}] (default: No License): `
      )
    );
    const username = (await rl.question('GitHub username (optional): ')).trim();
    const email = (await rl.question('Email address (optional): ')).trim();

    return {
      title,
      description,
      installation,
      usage,
      contribution,
      testing,
      license,
      username,
      email,
    };
  } finally {
    rl.close();
  }
}

async function run(argv = process.argv.slice(2)) {
  const { values } = parseArgs({
    args: argv,
    options: {
      output: { type: 'string' },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
    allowPositionals: false,
  });

  if (values.help) {
    printHelp();
    return;
  }

  const answers = await promptForAnswers();
  const markdown = generateMarkdown(answers);
  const filePath = resolveOutputPath(values.output, process.cwd());

  await writeFileSafely(filePath, markdown, { force: values.force });

  console.log(`README written to ${path.relative(process.cwd(), filePath)}`);
}

if (require.main === module) {
  run().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  run,
  promptForAnswers,
  normalizeLicense,
  normalizeRequired,
  DEFAULT_OUTPUT,
};
