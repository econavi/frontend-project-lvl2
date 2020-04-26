import fs from 'fs';
import path from 'path';

import buildTree from './buildTree';
import makeDiff from './formatters';
import getDataByFile from './parsers.js';

const genDiff = (firstConfig, secondConfig, format) => {
  const filePath1 = path.resolve(
    process.cwd(),
    firstConfig,
  );

  const filePath2 = path.resolve(
    process.cwd(),
    secondConfig,
  );

  const before = getDataByFile(
    fs.readFileSync(filePath1, 'utf-8'),
    path.extname(filePath1).slice(1),
  );

  const after = getDataByFile(
    fs.readFileSync(filePath2, 'utf-8'),
    path.extname(filePath2).slice(1),
  );

  const ast = buildTree(before, after);
  const result = makeDiff(ast, format);

  return result;
};

export default genDiff;
