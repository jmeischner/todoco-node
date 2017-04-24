let todoReader = require('./src/extracting/reader');
let todoStringBuilder = require('./src/extracting/string-builder');
let configReader = require('./src/config/config');
let list = require('./src/logging/list-todo');

let config = configReader.readConfig(__dirname);
let files = configReader.getFiles(__dirname, config.files);


todoReader(files).subscribe(todo => {
    // console.log("<==================>");
    // console.log("Datei: " + todo.path);
    // todo.todos.map(x => console.log("Zeile: " + todo.line + " Zu tun ist: " + todoStringBuilder.extractTodo(x)));
    console.log(todo);
});
