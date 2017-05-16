const config = require('../../src/config/config');
const log = require('../../src/logging/log');
const path = require('path');
const fs = require('fs');

describe('Tests for the config module', function() {

    describe('readConfig', () => {
        it('read empty config should give default values.', () => {
            const testConfig = config.readConfig('test/config/test-files/empty-todoco');
            expect(testConfig).toEqual({
                files: {
                    useGitignore: false,
                    ignore: [],
                    add: []
                }
            });
        });

        it('if there is no config in given Directory it should give an error.', () => {
            const result = config.readConfig('/');
            expect(result).toBeFalsy();
        });

        it('should show an error if config file is not parsable', () => {
            spyOn(log, 'error');
            config.readConfig('test/config/test-files/invalid-todoco');
            expect(log.error).toHaveBeenCalledTimes(1);
        });

        it('should fill up config if there are not all values.', () => {
            var testConfig = config.readConfig('test/config/test-files/filled-todoco');
            expect(testConfig).toEqual({
                project: {
                    name: 'ToDoCo',
                    author: 'Jan Meischner'
                },
                files : {
                    useGitignore: false,
                    ignore: [
                        'node_modules/**/*',
                        'src/extracting/regex.js'
                    ],
                    add: []
                }
            });
        });
    });

    describe('getFiles', () => {

        it('should return only files from the config if useGitignore is false', (done) => {
            let testFiles = {
                useGitignore: false,
                ignore: ['**'],
                add: ['test/config/test-files/empty-todoco/.todoco']
            };

            let result = config.getFiles(testFiles);

            let count = 0;
            let noop = () => {};
            result
                .subscribe((file) => { count += file.length; }, noop, () => {
                expect(count).toBe(1);
                done();
            });
        });

        it('should read out .gitignore file and use the settings in combination with the config.', (done) => {
            let testFiles = {
                useGitignore: true,
                ignore: ['src/**', '!.todoco', '**'],
                add: ['test/config/test-files/empty-todoco/.todoco']
            };

            spyOn(fs, 'existsSync').and.returnValue(true);
            spyOn(fs, 'readFileSync').and.returnValue('node_modules');

            let result = config.getFiles(testFiles, '.');
            let count = 0;
            let noop = () => {};
            result
                .subscribe((file) => { count += file.length; }, noop, () => {
                expect(count).toBe(1);
                done();
            });
        });

        it('should ignore .gitignore file and use the settings from the config.', (done) => {
            let testFiles = {
                useGitignore: true,
                ignore: ['src/**', '!.todoco'],
                add: ['test/config/test-files/simpleTodo.js']
            };

            spyOn(fs, 'existsSync').and.returnValue(false);
            spyOn(fs, 'readFileSync').and.returnValue('node_modules');

            let result = config.getFiles(testFiles);
            let count = 0;
            let noop = () => {};
            result
                .subscribe(
                    (file) => {
                        count += 1;
                    },
                    noop, () => {
                        expect(count).toBe(1);
                        done();
                });
        });
    });
});
