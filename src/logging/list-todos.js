const colors = require('colors');
const _ = require('lodash');
const path = require('path');
const stringHelper = require('../common/string-helper');

function toConsole(file) {
    let filename = path.basename(file.file);
    let filepath = path.dirname(file.file);
    console.log(_.padEnd(" " + filename.yellow.underline, 50) + _.padStart('(' + filepath + ')', 30).yellow.dim.italic);
    _.forEach(file.todos, todo => {
        console.log(_.padStart(todo.line, 4).green + _.padEnd(":", 3) + stringHelper.buildMultilineTodoText(todo.text, 73, 7));
    });
    console.log("");
}

module.exports = {
    toConsole: toConsole
};
