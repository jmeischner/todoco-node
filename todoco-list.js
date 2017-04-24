const todoReader = require('./src/extracting/reader');
const configReader = require('./src/config/config');
const list = require('./src/logging/list-todos');

const config = configReader.readConfig(__dirname);
const files = configReader.getFiles(__dirname, config.files);

const clear = require('clear');
clear();

todoReader(files).subscribe(file => {
    list(file);
});
