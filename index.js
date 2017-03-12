var fs = require('fs');
var Rx = require('rxjs/Rx');
var glob = require('globby');

var todoReader = require('./todo-reader');
var todoStringBuilder = require('./todo-string-builder');

todoReader().subscribe(todo => {
    console.log("<==================>");
    console.log("Datei: " + todo.path);
    todo.todos.map(x => console.log("Zeile: " + todo.line + " Zu tun ist: " + todoStringBuilder.extractTodo(x)));
});


