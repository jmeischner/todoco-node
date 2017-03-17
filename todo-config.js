const fs = require('fs');
// Todo: read write mit "jsonfile" package
var readConfig = function () {
    if (!fs.existsSync(path.join(__dirname, '/config.json'))) {
        console.log("There is no config.json in module directory");
        return null;
    }

    var data = fs.readFileSync(path.join(__dirname, "/config.json"));
    var config;

    try {
        config = JSON.parse(data);
    } catch(err) {
        console.log("There has been an error parsing your JSON");
        console.log(err);
    }

    return config;
};

var saveConfig = function(config) {

    var savedConfig = readConfig();
    savedConfig.baseDir = config.baseDir;
    var data = JSON.stringify(savedConfig);

    return new Promise(function(fulfill, reject) {
        fs.writeFile(path.join(__dirname, '/config.json'), data, function (err) {
            if (err) reject(err);
            else fulfill();
        });
    });
};

module.exports = {
    readConfig: readConfig,
    saveConfig: saveConfig
};