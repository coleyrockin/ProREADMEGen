function generateMarkdown(data) {
  return `# ${data.title}
  ## Licensing:
  [![license](https://img.shields.io/badge/License-${data.license}-blue)](https://shields.io)
  ## Table of Contents 
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Testing](#testing)
  - [Additional Info](#additional-info-or-questions)
  ## Description:
  ${data.description}
  ## Installation:
  ${data.installation}
  ## Usage:
  ${data.usage}
  ## License:
  ${data.license}
  ## Contribution:
  ${data.contribution}
  ## Testing:
  ${data.testing}
  ## Additional Info or Questions:
  - Github: [${data.username}](https://github.com/${data.username})
  - Email: ${data.email} `;
}

module.exports = generateMarkdown;