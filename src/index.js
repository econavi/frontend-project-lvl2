import process from 'process';
import commander from 'commander';
import genDiff from './genDiff.js';
import parsers from './parsers.js';

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format [type]', 'output format');

program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  const before = parsers(firstConfig);
  const after = parsers(secondConfig);

  const result = genDiff(before, after);
  console.log(result);
});

program.parse(process.argv);

export default genDiff;
