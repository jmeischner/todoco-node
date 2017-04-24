const colors = require('colors');
const _ = require('lodash');
const path = require('path');

module.exports = function(file){
    let filename = path.basename(file.file);
    let filepath = path.dirname(file.file);
    console.log(_.padEnd(" " + filename.yellow.underline, 50) + `(${filepath})`.yellow.dim.italic);
    _.forEach(file.todos, todo => {
        console.log(_.padStart(todo.line, 4).green + _.padEnd(":", 3) + buildMultilineTodoText(todo.text, 60, 7));
    });
    console.log("");
};

function splitStringByLength(string, length) {
    let result = [];
    let words = string.split(' ');
    let line = "";
    for (let i = 0; i < words.length; i++) {
        if (line.length + words[i].length > length) {
            result.push(line);
            line = words[i] + " ";
        } else {
            line += words[i] + " ";
        }
    }

    if (line.length > 0) {
        result.push(line);
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