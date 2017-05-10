const todoReader = require('./src/extracting/reader');
const configReader = require('./src/config/config');
const list = require('./src/logging/list-todos');
const program = require('commander');
const path = require('path');

program
    .option('-p, --path <path>', 'List Todos of files in given path')
    .parse(process.argv);

if (program.path) {
    let filesPath = path.join(program.path, '**');
    const filesConfig = {
        add: [filesPath],
        ignore: ['**'],
        useGitignore: false
    };

    const files = configReader.getFiles('', filesConfig);
    readTodosFromFiles(files);

} else {
    const config = configReader.readConfig('.');
    const files = configReader.getFiles('.', config.files);
    readTodosFromFiles(files);
}

function readTodosFromFiles(files){
    const clear = require('clear');
    clear();

    todoReader(files).subscribe(file => {
        list(file);
    });
}
