const stringBuilder = require('../../src/extracting/string-builder');

describe('The String Builder', () => {
    it('should extract the todo message from a todo comment', () => {
        let todoComment = "// Todo: This is a Todo";
        let comment = stringBuilder.extractTodo(todoComment);
        expect(comment).toBe("This is a Todo");
    });
});