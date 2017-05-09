const list = require('../../src/logging/list-todos');

describe('The List Todos module', () => {
    it('should print a short and simple Todo output for one file', () => {
        spyOn(console, 'log');

        let file = {
            file: 'path/to/file.js',
            todos: [{
                line: 1,
                text: 'This is a simple Todo'
            }]
        };

        list(file);

        expect(console.log).toHaveBeenCalledWith(' file.js                                          (path/to)');
        expect(console.log).toHaveBeenCalledWith('   1:  This is a simple Todo');
        expect(console.log).toHaveBeenCalledWith('');
    });
});