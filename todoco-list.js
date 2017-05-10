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
    const filesInPath = {
        add: [filesPath],
        ignore: ['**'],
        useGitignore: false
    };

    const files = configReader.getFiles('', filesInPath);
    readTodosFromFiles(files);

} else {
    const config = configReader.readConfig('.');
    let files = [];
    if (config) {
        files = configReader.getFiles('.', config.files);
    } else {
        const filesInCurrentDir = {
            add: [],
            ignore: [],
            useGitignore: false 
        };
        files = configReader.getFiles('.', filesInCurrentDir);
    }

    readTodosFromFiles(files);
}

function readTodosFromFiles(files){
    const clear = require('clear');
    clear();

    todoReader(files).subscribe(file => {
        list(file);
    });
}
