const fs = require('fs');
const Rx = require('rxjs/Rx');
const glob = require('globby');
const readline = require('readline');

// Todo: Regex bricht gerade bei Doppelpunkten ab
const todoRegex = require('./todo-regex')();

// Todo: added a config reader for paths and ignore paths
module.exports = function(paths) {
    return Rx.Observable.fromPromise(glob(['**/*.js', '!node_modules/**']))
    .flatMap(path => Rx.Observable.from(path))
    .map(extractTodo)
    .flatMap(file => {
        var linenumber = 0;
        return Rx.Observable.fromEvent(file.datastream, 'line', line => {
            linenumber++;
            var match = line.match(todoRegex);
            if (match) {
                return {
                    path: file.path,
                    todos: match,
                    line: linenumber
                };
            }
        }, error => {
            console.error(error);
        });
    })
    .filter(todo => todo !== undefined);
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