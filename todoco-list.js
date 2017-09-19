const program = require('commander');
const list = require('./src/logging/list-options');

program
    .usage('<files>')
    .parse(process.argv);

if (program.args.length > 0) {
    list.inDir(program.args);
} else {
    list.fromConfig();
}


