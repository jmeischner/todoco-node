

var extractTodo = function(todo) {
    return todo.split(":")[1];
};

module.exports = {
    extractTodo: extractTodo
};