var fs = require('fs');
var Rx = require('rxjs/Rx');
var glob = require('globby');

var todoReader = require('./src/todo-reader');
var todoStringBuilder = require('./src/todo-string-builder');
var configReader = require('./src/todo-config');


let config = configReader.readConfig(__dirname);
let files = [];
if (config.useGitignore) {
    files = configReader.files.fromGitignore(__dirname);
} else {
    files = configReader.files.fromConfig(config.files);
}

todoReader(files).subscribe(todo => {
    console.log("<==================>");
    console.log("Datei: " + todo.path);
    todo.todos.map(x => console.log("Zeile: " + todo.line + " Zu tun ist: " + todoStringBuilder.extractTodo(x)));
});


