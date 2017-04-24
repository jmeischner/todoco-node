var program = require('commander');

program
    .version('0.0.1')
    .command('list', 'List ToDos of current project', {isDefault: true})
    .command('push', 'Push ToDos to the configured Server')
    .parse(process.argv);