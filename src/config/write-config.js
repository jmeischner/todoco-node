const tomlify = require('tomlify-j0.4');
const path = require('path');
const fs = require('fs');

const writeConfig = function (directory, config) {
    
    config = removeConfigureServerValue(config);
    config = addEmptyAddAndIgnoreFiles(config);
    let tomlConfig = tomlify(config, null, 2);
    let filepath = path.join(directory, '.todoco');
    fs.writeFileSync(filepath, tomlConfig);
};

const removeConfigureServerValue = function(config) {
    delete config.configureServer;
    return config; 
};

const addEmptyAddAndIgnoreFiles = function(config) {
    config.files.add = [];
    config.files.ignore = [];
    return config;
};

module.exports = writeConfig;