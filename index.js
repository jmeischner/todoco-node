var fs = require('fs');
var Rx = require('rxjs/Rx');
var glob = require('globby');
var _ = require('lodash');

var todoRegex = /todo:.*/ig;

Rx.Observable.fromPromise(glob(['**/*.js', '!node_modules/**/*']))
    .flatMap(path => Rx.Observable.from(path))
    .map(extractTodo)
    .subscribe(file => {
        file.datastream.subscribe(data => {
            console.log("Path: " + file.path + "\nContent:\n" + data.match(todoRegex));
        }, error => {
            console.error(error);
        });
    });

function extractTodo(path) {
    var datastream = Rx.Observable.bindNodeCallback(fs.readFile);
    return {
        path: path,
        datastream: datastream(path, 'utf8')
    };
}

