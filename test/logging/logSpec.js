const log = require('../../src/logging/log');

describe('The Logging Module', () => {
    it('should log an error message without details', () => {
        spyOn(console, 'log');
        log.error('Code', 'An Error');
        expect(console.log).toHaveBeenCalledWith('[Code]: An Error');
    });

    it('should log an error message with details', () => {
        spyOn(console, 'log');
        log.error('Code', 'An Error', 'With Details');
        expect(console.log).toHaveBeenCalledWith('[Code]: An Error\nDetails: With Details');
    });
});
