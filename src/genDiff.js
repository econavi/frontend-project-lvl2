import fs from 'fs';
import path from 'path';

import buildTree from './buildTree';
import formatters from './formatters';
import parsers from './parsers.js';

const genDiff = (firstConfig, secondConfig, format) => {
  const filePath1 = path.resolve(
    process.cwd(),
    firstConfig,
  );

  const filePath2 = path.resolve(
    process.cwd(),
    secondConfig,
  );

  const before = parsers(
    fs.readFileSync(filePath1, 'utf-8'),
    path.extname(filePath1),
  );

  const after = parsers(
    fs.readFileSync(filePath2, 'utf-8'),
    path.extname(filePath2),
  );

  const ast = buildTree(before, after);
  const result = formatters(ast, format);

  return result;
};

export default genDiff;
