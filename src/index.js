import fs from 'fs';
import process from 'process';
import commander from 'commander';
import genDiff from './genDiff.js';

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format [type]', 'output format');

program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  const before = JSON.parse(fs.readFileSync(firstConfig));
  const after = JSON.parse(fs.readFileSync(secondConfig));

  const result = genDiff(before, after);
  console.log(result);
});

program.parse(process.argv);

export default genDiff;
