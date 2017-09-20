#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.2')
    .command('list', 'List ToDos of current project', {isDefault: true})
    .command('init', 'Initiate a ToDoCo Project. Results in a .todoco config file.')
    .command('push', 'Push ToDos to the configured Server [Not Implemented]')
    .parse(process.argv);
