const inquirer = require('inquirer');
const writeConfig = require('./src/config/write-config');


let questions = [
    {
        name: 'project.name',
        type: 'input',
        message: 'What is the name of your project'
    },
    {
        name: 'files.useGitignore',
        type: 'confirm',
        default: true,
        message: 'Do you want to use the .gitignore file to set ignored files?'
    },
    {
        name: 'configureServer',
        type: 'confirm',
        default: false,
        message: 'Do you wish to configure a ToDoCo Server connection?'
    },
    {
        when: response => response.configureServer,
        name: 'server.hostname',
        type: 'input',
        default: 'localhost',
        message: 'Hostname'
    },
    {
        when: response => response.configureServer,
        name: 'server.port',
        type: 'input',
        default: '80',
        message: 'Port',
        validate: value => isFinite(value)
    },
    {
        when: response => response.configureServer,
        name: 'server.username',
        type: 'input',
        message: 'Username'
    },
    {
        when: response => response.configureServer,
        name: 'server.password',
        type: 'password',
        message: 'Password'
    }
];

inquirer
    .prompt(questions)
    .then(answers => writeConfig('.', answers));

