var extractTodo = function(todo) {
    return todo.split(":")[1].trim();
};

module.exports = {
    extractTodo: extractTodo
};