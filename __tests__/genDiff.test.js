import parsers from '../src/parsers';
import genDiff from '../src/genDiff';

import { readFile } from '../src/utils';

test('genDiff', () => {
  const beforePlain = parsers('before-plain.json');
  const afterPlain = parsers('after-plain.json');

  const beforeRecursion = parsers('before.json');
  const afterRecursion = parsers('after.json');

  const beforeYaml = parsers('before.yml');
  const afterYaml = parsers('after.yml');

  const beforeIni = parsers('before.ini');
  const afterIni = parsers('after.ini');

  const expectedRecursion = readFile('result-recursion.txt');
  const expectedPlain = readFile('result-plain.txt');
  const expectedPlainFormat = readFile('result-plain-format.txt');
  const expectedJsonFormat = readFile('result-json-format.json');

  expect(genDiff(beforePlain, afterPlain)).toBe(expectedPlain);
  expect(genDiff(beforeRecursion, afterRecursion)).toBe(expectedRecursion);
  expect(genDiff(beforeYaml, afterYaml)).toBe(expectedRecursion);
  expect(genDiff(beforeIni, afterIni)).toBe(expectedRecursion);
  expect(genDiff(beforeRecursion, afterRecursion, 'plain'))
    .toBe(expectedPlainFormat);
  expect(genDiff(beforeRecursion, afterRecursion, 'json'))
    .toBe(expectedJsonFormat);
});
