
import path from 'path';
import fs from 'fs';

import genDiff from '../src';

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs
  .readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'result-recursion.txt'],
  ['yml', 'result-recursion.txt'],
  ['ini', 'result-recursion.txt'],
  ['json', 'result-plain-format.txt', 'plain'],
  ['json', 'result-json-format.json', 'json'],
])('genDiff(%#)', (extFile, expectedFileName, outputFormat = '') => {
  const before = getFixturePath(`before.${extFile}`);
  const after = getFixturePath(`after.${extFile}`);
  const expected = readFile(expectedFileName);

  expect(genDiff(before, after, outputFormat)).toBe(expected);
});
