// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('util');

// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    name: 'title',
    message: 'What is the title of your reposiory?(REQUIRED!)',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter your repo title.');
            return false;
        }
    }
},
//DESCRIPTION
{
    type: 'input',
    name: 'description',
    message: 'What is the description of your repository?(REQUIRED!)',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please eneter a description of the repository.');
        }
    }
},
//INSTALL QUESTION
{
    type: 'confirm',
    name: 'confirmInstall',
    message: 'Is there an installation process?'
},
{
    type: 'input',
    name: 'Installation',
    message: 'Please list installion instructions.',
    // If person says yes to install install process, prompt this list install instr below
    when: ({ confirmInstall }) => {
        if (confirmInstall) {
            return true;
        } else {
            return false
        }
    }
},
{ //confirm
    type: 'confirm',
    name: 'confirmUsage',
    message: 'Would you like to give instructions for using your application?',
},
{//if yes
    type: 'input',
    name: 'instructions',
    message: 'Please list instructions for using application.',
    when: ({ confirmUsage }) => {
        if (confirmUsage) {
            return true;
        } else {
            return false;
        }
    }
},

{
    type: 'confirm',
    name: 'confirmContrinution',
    message: 'May other developers contribute to your repository?'
},


];
// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
