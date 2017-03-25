const jsonfile = require('jsonfile');
const ignore = require('ignore');
const fs = require('fs');
const globby = require('globby');
const path = require('path');
const Rx = require('rxjs/Rx');

var readIgnore = function () {
    var gitignoreFile = path.join(__dirname, '/../.gitignore'); 
    console.log(gitignoreFile);
    if (fs.existsSync(gitignoreFile)) {
        const ig = ignore().add(fs.readFileSync(gitignoreFile).toString());
        globby(['**']).then(paths => {
            let filteredFiles = ig.filter(paths);
        });
    }
};

var readConfig = function () {
    if (!fs.existsSync(path.join(__dirname, '/config.json'))) {
        console.log("There is no config.json in module directory");
        return null;
    }

    return new Promise(function(fulfill, reject) {
        jsonfile.readFile(path.join(__dirname, "/config.json"), function(err, obj) {
            if (err) 
                reject(err);
            else 
                fulfill(obj);   
        });
    });
};

var saveConfig = function(config) {

    return new Promise(function(fulfill, reject) {
        jsonfile.writeFile(path.join(__dirname, '/config.json'), data, {spaces: 4}, function (err) {
            if (err) reject(err);
            else fulfill();
        });
    });
};

module.exports = {
    readIgnore: readIgnore,
    readConfig: readConfig,
    saveConfig: saveConfig
};