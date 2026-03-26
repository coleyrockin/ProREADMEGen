# ProREADMEGen

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js&logoColor=white)
![Inquirer](https://img.shields.io/badge/Inquirer-8.x-green?style=flat)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

## About

A command-line application that dynamically generates a professional README.md file from user input. Answer a series of prompts about your project and receive a polished, structured README complete with a table of contents, license badge, and all standard sections.

## Features

- **Interactive CLI** — Inquirer-driven prompts for all README sections
- **Auto-Generated TOC** — Table of contents with anchor links
- **License Badge** — Automatic badge and notice based on license selection
- **Markdown Output** — Clean, properly formatted README.md
- **Standard Sections** — Description, installation, usage, contributing, tests, and questions

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| CLI | Inquirer 8 |
| Output | Markdown (.md) |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/coleyrockin/ProREADMEGen.git
cd ProREADMEGen

# Install dependencies
npm install

# Run the generator
node index.js
```

The generated README file is saved to the project root.

## Project Structure

```
ProREADMEGen/
├── utils/          # README template and file generation logic
├── index.js        # CLI entry point with Inquirer prompts
├── Readme1.md      # Sample generated output
└── package.json
```

---

Built by [Boyd Roberts](https://github.com/coleyrockin)
