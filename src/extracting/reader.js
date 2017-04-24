const fs = require('fs');
const Rx = require('rxjs/Rx');
const glob = require('globby');
const readline = require('readline');

const log = require('../logging/log');

// Todo: Regex bricht gerade bei Doppelpunkten ab
const todoRegex = require('./regex')();
const stringBuilder = require('./string-builder');

// Todo: added a config reader for paths and ignore paths
module.exports = function(rxPaths) {
    return rxPaths
    .flatMap(path => Rx.Observable.from(path))
    .map(extractTodo)
    .flatMap(file => {
        var linenumber = 0;
        
        return Rx.Observable.fromEvent(file.datastream, 'line')
        .takeUntil(Rx.Observable.fromEvent(file.datastream, 'close'))
        .map(line => {
            
            linenumber++;
            var match = line.match(todoRegex);
            if (match) {
                return {
                    text: stringBuilder.extractTodo(match[0]),
                    line: linenumber
                };
            }
        }, error => {
            log.error(error);
        })
        .filter(todo => todo !== undefined)
        .reduce((result, todo) => {
            result.todos.push(todo);
            return result;
        }, {file: file.path, todos: []})
        .filter(file => file.todos.length > 0)
        ;
    });
};

// Todo: Whats faster readFile and only lines if there is a match or read all files, by line and found the matches?

// function extractTodo(path) {
//     var datastream = Rx.Observable.bindNodeCallback(fs.readFile);
//     return {
//         path: path,
//         datastream: datastream(path, 'utf8')
//     };
// }

function extractTodo(path) {
    const rl = readline.createInterface({
        input: fs.createReadStream(path)
    });

    return {
        path: path,
        datastream: rl
    };
}