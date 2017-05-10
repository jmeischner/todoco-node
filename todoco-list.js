const program = require('commander');
const list = require('./src/logging/list-options');

program
    .option('-p, --path <path>', 'List Todos of files in given path')
    .parse(process.argv);

if (program.path) {
    list.inDir(program.path);
} else {
    list.fromConfig();
}


