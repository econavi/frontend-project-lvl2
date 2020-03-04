#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();

program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.parse(process.argv);
