let colors = require('colors');

const errorLog = function(code, message, details=false) {
    const errorCode = "[" + code + "]";
    let error = "";
    if (details) {
        error = errorCode.bold.red + ": ".cyan + message.red.bold + "\n" + "Details".bold + ": ".cyan + details;
    } else {
        error = errorCode.bold.red + ": ".cyan + message.red.bold;
    }
    console.log(error);

    return null;
};

const infoLog = function(code, message) {
    const infoCode = "[" + code + "]";
    let info = infoCode.green + ": ".cyan + message.green;
    console.log(info);

    return null;
};


module.exports = {
    error: errorLog,
    info: infoLog
};
