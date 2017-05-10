const todoReader = require('./../extracting/reader');
const configReader = require('./../config/config');
const listTodos = require('./list-todos');
const log = require('./log');

const colors = require('colors');
const path = require('path');
const clear = require('clear');
const _ = require('lodash');

function listTodosForGivenPath(dir) {
    let filesPath = path.join(dir, '**');
    const allFilesInPath = {
        add: [filesPath],
        ignore: ['**'],
        useGitignore: false
    };

    const files = configReader.getFiles(allFilesInPath);
    readTodosFromFiles(files);
}

function listTodosFromConfig() {
    const config = configReader.readConfig();
    let files = configReader.getFiles(config.files);
    readTodosFromFiles(files);
}

function readTodosFromFiles(files){
    clear();
    console.log('-'.repeat(80).blue);
    let nrOfFiles = 0;
    let nrOfTodos = 0;
    todoReader(files).subscribe(file => {
        nrOfFiles++;
        nrOfTodos += file.todos.length;
        listTodos(file);
    }, (err) => {
        log.error('C002', 'An error occured during looking for ToDos in files', err);
    }, () => {
        if (nrOfFiles === 0) {
            log.info('I001', 'No ToDos found.');
        } else {
            let todoString = nrOfTodos > 1 ? 'ToDos' : 'ToDo';
            console.log('-'.repeat(80).blue);
            console.log(_.padStart('Found ' + nrOfTodos + ' ' + todoString + ' in ' + nrOfFiles + ' files.', 77).green);
        }
    });


}

module.exports = {
    inDir: listTodosForGivenPath,
    fromConfig: listTodosFromConfig
};
