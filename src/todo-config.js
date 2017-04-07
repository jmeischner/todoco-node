const jsonfile = require('jsonfile');
const ignore = require('ignore');
const fs = require('fs');
const globby = require('globby');
const path = require('path');
const Rx = require('rxjs/Rx');
const toml = require('toml');
const log = require('./todo-log');
const _ = require('lodash');

var readConfig = function (directory) {
    let configPath = path.join(directory, '/.todoco');
    
    if (!fs.existsSync(configPath)) {
        return log.error('C001', 'No ".todoco" file exists in project dir.', 'Path: ' + configPath);
    }

    const tomlFile = fs.readFileSync(configPath);
    let config = {};
    try {
        config = toml.parse(tomlFile);
    } catch (e) {
        return log.error("C002", 'Error during parsing ".todoco" file', "Parsing error on line " + e.line + ", column " + e.column + ": " + e.message);
    }

    return config;
};

var filesFromGitignore = function (directory) {
    var gitignoreFile = path.join(directory, '/.gitignore');
    if (fs.existsSync(gitignoreFile)) {
        const ig = ignore().add(fs.readFileSync(gitignoreFile).toString());
        return Rx.Observable.fromPromise(globby(['**'], {nodir: true}))
        .map(paths => {
            return ig.filter(paths);
        });
    } else {
        return null;
    }
};

// Todo: Prüfen ob der Punkt files in config überhaupt exisitert, wenn nicht alle nehmen
var filesFromConfig = function(files) {
    const ignoreEntries = _.map(files.ignore, file => {
        return '!'+file;
    });
    return Rx.Observable.fromPromise(globby(_.concat(['**'], ignoreEntries, files.add), {nodir: true}));
};

module.exports = {
    files: {
        fromGitignore: filesFromGitignore,
        fromConfig: filesFromConfig
    },
    readConfig: readConfig
};