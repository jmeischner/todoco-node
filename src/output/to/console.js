const colors = require('colors');
const _ = require('lodash');
const path = require('path');
const clear = require('clear');

const todoReader = require('../../extracting/reader');
const stringHelper = require('../../common/string-helper');

function fileToConsole(file) {
    let filename = path.basename(file.file);
    let filepath = path.dirname(file.file);
    console.log(_.padEnd(" " + filename.yellow.underline, 50) + _.padStart('(' + filepath + ')', 30).yellow.dim.italic);
    _.forEach(file.todos, todo => {
        console.log(_.padStart(todo.line, 4).green + _.padEnd(":", 3) + stringHelper.buildMultilineTodoText(todo.text, 73, 7));
    });
    console.log("");
}

function toConsole(files){
    clear();
    console.log('-'.repeat(80).blue);
    let nrOfFiles = 0;
    let nrOfTodos = 0;
    return new Promise ((fulfill, reject) => {
        todoReader.stream(files).subscribe(file => {
            nrOfFiles++;
            nrOfTodos += file.todos.length;
            fileToConsole(file);
        }, (err) => {
            log.error('C002', 'An error occured during looking for ToDos in files', err);
            reject(err);
        }, () => {
            if (nrOfFiles === 0) {
                log.info('I001', 'No ToDos found.');
            } else {
                let todoString = nrOfTodos === 1 ? 'ToDo' : 'ToDos';
                console.log('-'.repeat(80).blue);
                console.log(_.padStart('Found ' + nrOfTodos + ' ' + todoString + ' in ' + nrOfFiles + ' files.', 77).green);
            }
            fulfill();
        });
    });

}

module.exports = toConsole;
