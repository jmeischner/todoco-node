// Todo: Regex stops at colon
var extractTodo = function(todo) {
    return todo.split(":")[1].trim();
};

// Todo: Add ignore comment to ignore following line
module.exports = {
    extractTodo: extractTodo
};