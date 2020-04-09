#!/usr/bin/env node

import commander from 'commander';
import process from 'process';

import genDiff from '../index.js';

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format <type>', 'output format', 'default');

program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  const format = program.format || '';
  const result = genDiff(firstConfig, secondConfig, format);

  console.log(result);
});

program.parse(process.argv);
