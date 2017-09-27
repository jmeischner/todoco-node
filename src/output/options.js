const configReader = require('../config/config');
const log = require('./log');

const colors = require('colors');
const path = require('path');
const _ = require('lodash');

/** Output Methods **/
const to = require('./to');

function listTodosForGivenPath(files, options = {}) {

    const allFilesInPath = {
        add: files,
        ignore: [],
        useGitignore: false
    };

    const rxFiles = configReader.getFiles(allFilesInPath);

    return checkOptions(rxFiles, options);
}

function listTodosFromConfig(options = {}) {
    const config = configReader.readConfig();

    let files = configReader.getFiles(config.files);
    return checkOptions(files, options);
}

function checkOptions(files, options) {

    switch (options.output) {
        case "taskpaper":
            return to.taskpaper(files);
        default:
            return to.console(files);
    }
}

module.exports = {
    inDir: listTodosForGivenPath,
    fromConfig: listTodosFromConfig,
};
