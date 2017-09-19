const listOptions = require('../../src/logging/list-options');
const listTodos = require('../../src/logging/list-todos');

describe('List Options', () => {
    it('should should list todos specific dir without having a config file', (done) => {
        spyOn(listTodos, 'toConsole');
        listOptions.inDir('test/logging/test-files/').then(() => {
            // Todo: Bessere Erwartungen formulieren
            expect(listTodos.toConsole).toHaveBeenCalled();
            done();
        });

    });

    it('should list the todos from config file', (done) => {
        spyOn(listTodos, 'toConsole');
        listOptions.fromConfig().then(() => {
            // Todo: Bessere Erwartungen formulieren
            expect(listTodos.toConsole).toHaveBeenCalled();
            done();
        });

    });
});
