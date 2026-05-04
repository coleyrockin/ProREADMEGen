const LICENSE_OPTIONS = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'BSD-3-Clause',
  'Mozilla Public License 2.0',
  'The Unlicense',
  'No License',
];

const LICENSE_BADGES = {
  MIT: 'MIT',
  'Apache-2.0': 'Apache%202.0',
  'GPL-3.0': 'GPLv3',
  'BSD-3-Clause': 'BSD%203--Clause',
  'Mozilla Public License 2.0': 'MPL%202.0',
  'The Unlicense': 'Unlicense',
};

function hasValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function sanitizeGithubUsername(username) {
  if (!hasValue(username)) {
    return '';
  }

  return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37})$/.test(username.trim())
    ? username.trim()
    : '';
}

function buildTableOfContents(sections) {
  return sections.map(section => `- [${section}](#${section.toLowerCase().replace(/ /g, '-')})`);
}

function buildSection(title, body) {
  return `## ${title}\n\n${body}`;
}

function buildQuestionsSection(username, email) {
  const lines = [];
  const githubUsername = sanitizeGithubUsername(username);

  if (githubUsername) {
    lines.push(`GitHub: [${githubUsername}](https://github.com/${githubUsername})`);
  }

  if (hasValue(email)) {
    lines.push(`Email: ${email.trim()}`);
  }

  if (lines.length === 0) {
    return buildSection('Questions', 'No public contact details provided.');
  }

  return buildSection('Questions', lines.join('\n'));
}

function buildLicenseBlock(license) {
  if (!hasValue(license) || license === 'No License') {
    return [];
  }

  const badge = LICENSE_BADGES[license];
  const blocks = [];

  if (badge) {
    blocks.push(`[![License: ${license}](https://img.shields.io/badge/License-${badge}-blue.svg)](https://opensource.org/licenses)`);
  }

  blocks.push(buildSection('License', `Distributed under the ${license} license.`));
  return blocks;
}

function generateMarkdown(data) {
  const sections = ['Description'];

  if (hasValue(data.installation)) {
    sections.push('Installation');
  }
  if (hasValue(data.usage)) {
    sections.push('Usage');
  }
  if (hasValue(data.contribution)) {
    sections.push('Contribution');
  }
  if (hasValue(data.testing)) {
    sections.push('Testing');
  }
  sections.push('Questions');

  const parts = [`# ${data.title.trim()}`];
  parts.push(...buildLicenseBlock(data.license));
  parts.push(buildSection('Table of Contents', buildTableOfContents(sections).join('\n')));
  parts.push(buildSection('Description', data.description.trim()));

  if (hasValue(data.installation)) {
    parts.push(buildSection('Installation', data.installation.trim()));
  }
  if (hasValue(data.usage)) {
    parts.push(buildSection('Usage', data.usage.trim()));
  }
  if (hasValue(data.contribution)) {
    parts.push(buildSection('Contribution', data.contribution.trim()));
  }
  if (hasValue(data.testing)) {
    parts.push(buildSection('Testing', data.testing.trim()));
  }

  parts.push(buildQuestionsSection(data.username, data.email));

  return `${parts.join('\n\n')}\n`;
}

module.exports = {
  LICENSE_OPTIONS,
  generateMarkdown,
};
