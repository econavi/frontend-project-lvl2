#!/usr/bin/env node

import commander from 'commander';
import process from 'process';

import genDiff from '../index.js';
import parsers from '../parsers.js';

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format <type>', 'output format', 'default');

program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  const before = parsers(firstConfig);
  const after = parsers(secondConfig);
  const format = program.format || '';

  const result = genDiff(before, after, format);
  console.log(result);
});

program.parse(process.argv);
