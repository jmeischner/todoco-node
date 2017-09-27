const reader = require('../../src/extracting/reader');
const Rx = require('rxjs/Rx');

describe('Todo Reader Module', () => {
    it('should read a todo from example file', (done) => {

        let paths = Rx.Observable.from([['test/extracting/test-files/simpleTodo.js']]);
        let noop = () => {};
        let files = [];

        reader.stream(paths).subscribe(
            (file) => {
                files.push(file);
            },
            noop,
            () => {
                expect(files.length).toBe(1);
                expect(files[0]).toEqual({
                    file: 'test/extracting/test-files/simpleTodo.js',
                    todos: [
                        {
                            text: 'Extracting -- Simple Todo',
                            line: 1
                        }
                    ]
                });
                done();
        });
    });
});
