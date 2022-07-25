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
//Contributer section
{
    type: 'confirm',
    name: 'confirmContribution',
    message: 'May other developers contribute to your repository?'
},
{
    type: 'input',
    name: 'contribution',
    message: 'Please explain how other developers may contribute to your project.',
    when: ({ confirmContribution }) => {
        if (confirmContribution) {
            return true;
        } else {
            return false;
        }
    }
},
//Testing section
{
    type: 'confirm',
    name: 'testConfirm',
    message: 'Is Testing available?',
},
{
    type: 'input',
    name: 'testing',
    message: 'Please explain how users may test your application.',
    when: ({ testConfirm }) => {
        if (testConfirm) {
            return true;
        } else {
            return false;
        }
    }
},
//Licensing check box option
{
    type: 'checkbox',
    name: 'license',
    message: 'Please choose a license.',
    choices: ['MIT License', 'GNU AGPLv3', 'GNU GPLv3',
    'GNU LGPLv3', 'Mozilla Public License 2.0',
    'Apache License 2.0', 'Boost Software License 1.0',
    'The Unlicense'],
    validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please select a license.');
          return false;
        }
    }
},
//GITHUB Username Input
{
    type: 'input',
    name: 'username',
    message: 'What is your GitHub username? (Required)',
    validate: nameInput => {
        if (nameInput) {
        return true;
        } else {
        console.log('Please enter your GitHub username.');
        return false;
        }
    }
},
//Email input
{
    type: 'input',
    name: 'email',
    message: 'What is your email address? (Required)',
    validate: nameInput => {
        if (nameInput) {
        return true;
        } else {
        console.log('Please enter your email.');
        return false;
        }
    }
},
{
    type: 'input',
    name: 'questions',
    message: 'Please list instructions for those who wish to contact you.',
    validate: (nameInput) => {
        if (nameInput) {
        return true;
        } else {
        return false;
        }
    }
}]; //end of questions array

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, error => {
        if (error) {
            return console.log('There was an error : ' + error);
        }
    })
};
const createReadMe = util.promisify(writeToFile);
// TODO: Create a function to initialize app
async function init() {
    try {
        const userAnswers = await inquirer.prompt(questions);
        console.log('Thank you!!! The current data is processing into a README.MD: ', userAnswers);
        const markdown = generateMarkdown(userAnswers);
        console.log(markdown);
        await createReadMe('Readme1.md', markdown);
    } catch (error) {
        console.log('Sorry there was an error.' + error);
    }
};

// Function call to initialize app
init();
