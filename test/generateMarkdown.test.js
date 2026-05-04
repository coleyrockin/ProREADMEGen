const assert = require('node:assert/strict');
const test = require('node:test');

const { generateMarkdown } = require('../utils/generateMarkdown');

test('generateMarkdown renders selected sections without undefined placeholders', () => {
  const markdown = generateMarkdown({
    title: 'Launch Kit',
    description: 'A CLI that creates polished README files.',
    installation: '',
    usage: 'Run `node index.js` and answer the prompts.',
    contribution: '',
    testing: 'Run `npm test`.',
    license: 'MIT',
    username: 'boyd-roberts',
    email: '',
  });

  assert.match(markdown, /^# Launch Kit\n\n/);
  assert.match(markdown, /\[!\[License: MIT\]/);
  assert.match(markdown, /## Description\n\nA CLI that creates polished README files\./);
  assert.doesNotMatch(markdown, /## Installation/);
  assert.match(markdown, /## Usage\n\nRun `node index\.js` and answer the prompts\./);
  assert.doesNotMatch(markdown, /undefined/);
});

test('generateMarkdown omits license badge when no license is selected', () => {
  const markdown = generateMarkdown({
    title: 'No License Project',
    description: 'Internal experiment.',
    license: 'No License',
    username: '',
    email: '',
  });

  assert.doesNotMatch(markdown, /shields\.io/);
  assert.doesNotMatch(markdown, /## License/);
  assert.match(markdown, /## Questions\n\nNo public contact details provided\./);
});

test('generateMarkdown validates structured contact fields before linking them', () => {
  const markdown = generateMarkdown({
    title: 'Contact Safe',
    description: 'Shows safe contact output.',
    license: 'Apache-2.0',
    username: 'bad/user',
    email: 'owner@example.com',
  });

  assert.doesNotMatch(markdown, /https:\/\/github\.com\/bad\/user/);
  assert.match(markdown, /Email: owner@example\.com/);
});
