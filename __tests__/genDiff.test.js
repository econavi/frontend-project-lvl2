import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

test('genDiff', () => {
  const before = JSON.parse(fs.readFileSync(path
    .join(__dirname, '..', '__fixtures__', 'before.json')));

  const after = JSON.parse(fs.readFileSync(path
    .join(__dirname, '..', '__fixtures__', 'after.json')));

  const expected = fs.readFileSync(path
    .join(__dirname, '..', '__fixtures__', 'result.txt'), 'utf-8');

  expect(genDiff(before, after)).toBe(expected);
});
