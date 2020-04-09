import path from 'path';

import parse from './parse';
import formatters from './formatters';
import parsers from './parsers.js';

const genDiff = (firstConfig, secondConfig, format = '') => {
  const path1 = path.resolve(
    process.cwd(),
    firstConfig,
  );
  const path2 = path.resolve(
    process.cwd(),
    secondConfig,
  );

  const before = parsers(path1);
  const after = parsers(path2);

  const ast = parse(before, after);
  const result = formatters(ast, format);

  return result;
};

export default genDiff;
