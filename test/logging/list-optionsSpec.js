const listOptions = require('../../src/output/options');
const to = require('../../src/output/to');

describe('List Options', () => {
    it('should should list todos specific dir without having a config file', (done) => {
        spyOn(to, 'console').and.callThrough();
        listOptions.inDir(['test/logging/test-files/simpleTodo.js']).then(() => {
            // Todo: Bessere Erwartungen formulieren
            expect(to.console).toHaveBeenCalled();
            done();
        });

    });

    it('should list the todos from config file', (done) => {
        spyOn(to, 'console').and.callThrough();
        listOptions.fromConfig().then(() => {
            // Todo: Bessere Erwartungen formulieren
            expect(to.console).toHaveBeenCalled();
            done();
        });

    });

    it('should reduce all files to one json', function(done) {
        spyOn(to, 'taskpaper').and.callThrough();
        listOptions.inDir(['test/logging/test-files/simpleTodo.js'], {'output': 'taskpaper'}).then((json) => {
            expect(to.taskpaper).toHaveBeenCalled();
            done();
        });
    });
});
