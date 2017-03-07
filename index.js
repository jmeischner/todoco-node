var fs = require('fs');
var Rx = require('rxjs/Rx');
var glob = require('globby');

var todoReader = require('./todo-reader');
var todoStringBuilder = require('./todo-string-builder');

todoReader().subscribe(todo => {
    console.log("Datei: " + todo.path);
    console.log("--------------------");
    todo.todos.map(x => console.log("Zu tun ist: " + todoStringBuilder.extractTodo(x)));
    console.log("<==================>");
    console.log("\n");
});


