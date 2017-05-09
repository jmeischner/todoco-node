const writeConfig = require('../../src/config/write-config');
const fs = require('fs');

describe('The write config module', () => {
    it('should produce a valid toml if config object is valid', () => {
        let testObject = {
            simple: {
                name: 'object'
            },
            files: {
                useGitignore: false
            }
        };

        spyOn(fs, 'writeFileSync');

        writeConfig('.', testObject);

        let expectedToml = 
`[simple]
name = "object"

[files]
useGitignore = false
add = []
ignore = []`;

        expect(fs.writeFileSync).toHaveBeenCalledWith('.todoco', expectedToml);
    });
});