var fs = require('fs');
var Rx = require('rxjs/Rx');
var glob = require('globby');

var todoRegex = require('./todo-regex')();

// Todo: added a config reader for paths and ignore paths
module.exports = function(paths) {
    return Rx.Observable.fromPromise(glob(['**/*.js', '!node_modules/**']))
    .flatMap(path => Rx.Observable.from(path))
    .map(extractTodo)
    .flatMap(file => {
        return file.datastream.map(data => {
            var match = data.match(todoRegex);
            if (match) {
                return {
                    path: file.path,
                    todos: match
                };
            }
        }, error => {
            console.error(error);
        });
    })
    .filter(todo => todo !== undefined);
};


function extractTodo(path) {
    var datastream = Rx.Observable.bindNodeCallback(fs.readFile);
    return {
        path: path,
        datastream: datastream(path, 'utf8')
    };
}