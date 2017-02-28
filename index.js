var fs = require('fs');
var Rx = require('rxjs');
var glob = require('globby');
var _ = require('lodash');

Rx.Observable.fromPromise(glob(['**/*.js', '!node_modules/**/*']))
    .flatMap(path => Rx.Observable.from(path))
    .map(extractTodo)
    .map(file => {
        var content = '';
        file.datastream.on('data', (d) => {
            content += d;
        });
        
        Rx.Observable.fromEvent(file.datastream, 'data').reduce((acc, x, idx, source) => {
            return acc + x;
        }).subscribe(x => console.log(x));
    }).subscribe(x => {
        console.log(x);
    });

function extractTodo(path) {
    return {
        path: path,
        datastream: fs.createReadStream(path, {
          flags: 'r',
          encoding: 'utf8',
          fd: null,
          mode: 0o666,
          autoClose: true
      })
    };
}

