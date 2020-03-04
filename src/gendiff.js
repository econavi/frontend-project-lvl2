#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();

program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');

program.option('-f, --format [type]', 'output format');

program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  console.log(firstConfig, secondConfig);
});

program.parse(process.argv);

if (program.format) console.log(`output format - ${program.format}`);
