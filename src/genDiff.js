import path from 'path';

import buildTree from './buildTree';
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

  const ast = buildTree(before, after);
  const result = formatters(ast, format);

  return result;
};

export default genDiff;
