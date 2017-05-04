// Todo: Regex stops at colon
var extractTodo = function(todo) {
    return todo.split(":")[1].trim();
};

// Todo: Add ignore comment to declare following line as no ToDo
module.exports = {
    extractTodo: extractTodo
};