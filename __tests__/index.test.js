import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiff', () => {
  const before = JSON.parse(fs.readFileSync(path
    .join(__dirname, '..', 'fixtures', 'before.json')));

  const after = JSON.parse(fs.readFileSync(path
    .join(__dirname, '..', 'fixtures', 'after.json')));

  const expected = `
host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true`;

  expect(genDiff(before, after)).toBe(expected);
});
