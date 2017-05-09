const _ = require('lodash');

module.exports = {
    splitStringByLength: splitStringByLength,
    buildMultilineTodoText: buildMultilineTodoText
};

function splitStringByLength(string, length) {
    let result = [];
    let words = string.split(' ');
    let line = "";
    for (let i = 0; i < words.length; i++) {
        if (line.length + words[i].length > length) {
            result.push(line.trim());
            line = words[i] + " ";
        } else {
            line += words[i] + " ";
        }
    }

    if (line.length > 0) {
        result.push(line.trim());
    }

    return result;
}

function buildMultilineTodoText(string, length, lineStartlength) {
    const lines = splitStringByLength(string, length);
    let result = lines[0];
    for (let i = 1; i < lines.length; i++) {
        result += "\n";
        result += _.repeat(" ", lineStartlength) + lines[i];
    }
    return result;
}