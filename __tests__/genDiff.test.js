import { readFile } from '../src/utils';
import genDiff from '../src/genDiff';

test('genDiff', () => {
  const before = JSON.parse(readFile('before.json'));

  const after = JSON.parse(readFile('after.json'));

  const expected = readFile('result.txt');

  expect(genDiff(before, after)).toBe(expected);
});
