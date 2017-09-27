const program = require('commander');
const list = require('./src/output/options');

program
    .usage('<files>')
    .option('-t, --task-paper', 'Write todos to Taskpaper file.')
    .parse(process.argv);

let options = {
    output: program.taskPaper ? 'taskpaper' : ''
};

if (program.args.length > 0) {

    list.inDir(program.args, options);
} else {
    list.fromConfig(options);
}


