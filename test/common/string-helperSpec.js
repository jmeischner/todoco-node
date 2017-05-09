const stringHelper = require('../../src/common/string-helper');

describe('The String Helper Module', () => {
    it('should split short string after given length', () => {
        let splittedString = stringHelper.splitStringByLength('Hello World', 6);
        expect(splittedString).toEqual(['Hello', 'World']);
    });

    it('should split long string after given length', () => {
        let splittedString = stringHelper.splitStringByLength('This is a really long TODO which results in multiple lines', 20);
        expect(splittedString).toEqual(['This is a really', 'long TODO which', 'results in multiple', 'lines']);
    });

    it('should build a wellformed multiline Todo text', () => {
        let todoText = stringHelper.buildMultilineTodoText('This is a multiline Todo Text', 15, 2);
        expect(todoText).toBe('This is a\n  multiline Todo\n  Text');
    });
});