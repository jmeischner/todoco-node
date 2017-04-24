const ignore = require('ignore');
const fs = require('fs');
const globby = require('globby');
const path = require('path');
const Rx = require('rxjs/Rx');
const toml = require('toml');
const log = require('../logging/log');
const _ = require('lodash');

// Todo: Refactor File
const readConfig = function (directory) {
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
    
    config = fillConfigWithDefaults(config);
    return config;
};

const filesFromGitignore = function (directory, toAdd, toIgnore) {
    var gitignoreFile = path.join(directory, '/.gitignore');
    if (fs.existsSync(gitignoreFile)) {
        const ig = ignore().add(fs.readFileSync(gitignoreFile).toString());
        return Rx.Observable.fromPromise(globby(_.concat(['**'], toIgnore, toAdd), {nodir: true}))
        .map(paths => {
            return ig.filter(paths);
        });
    } else {
        return Rx.Observable.from([]);
    }
};

const filesFromConfig = function(directory, files) {
    const addEntries = files.add;
    const ignoreEntries = convertIgnoreFilesFromConfig(files.ignore);
    if (files.useGitignore) {
        return filesFromGitignore(directory, addEntries, ignoreEntries);
    } else {
        return Rx.Observable.fromPromise(globby(_.concat(['**'], ignoreEntries, addEntries), {nodir: true}));
    }
};

module.exports = {
    getFiles: filesFromConfig,
    readConfig: readConfig
};

const convertIgnoreFilesFromConfig = function(toIgnore) { 

    return  _.map(toIgnore, file => {
        return file[0] === '!' ? file : '!' + file;
    });
    
};

const fillConfigWithDefaults = function(config) {

    config.files = config.files ? config.files : {
        useGitignore: false,
        ignore: [],
        add: []
    };
    config.files.useGitignore = config.files.useGitignore ? config.files.useGitignore : false;
    config.files.add = config.files.add ? config.files.add : [];
    config.files.ignore = config.files.ignore ? config.files.ignore : [];

    return config;
};