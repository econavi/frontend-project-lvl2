
import path from 'path';
import fs from 'fs';

import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs
  .readFileSync(getFixturePath(filename), 'utf-8');

const beforePlain = getFixturePath('before-plain.json');
const afterPlain = getFixturePath('after-plain.json');

const beforeRecursion = getFixturePath('before.json');
const afterRecursion = getFixturePath('after.json');

const beforeYaml = getFixturePath('before.yml');
const afterYaml = getFixturePath('after.yml');

const beforeIni = getFixturePath('before.ini');
const afterIni = getFixturePath('after.ini');

const expectedRecursion = readFile('result-recursion.txt');
const expectedPlain = readFile('result-plain.txt');
const expectedPlainFormat = readFile('result-plain-format.txt');
const expectedJsonFormat = readFile('result-json-format.json');

test.each([
  [beforePlain, afterPlain, expectedPlain],
  [beforeRecursion, afterRecursion, expectedRecursion],
  [beforeYaml, afterYaml, expectedRecursion],
  [beforeIni, afterIni, expectedRecursion],
  [beforeRecursion, afterRecursion, expectedPlainFormat, 'plain'],
  [beforeRecursion, afterRecursion, expectedJsonFormat, 'json'],
])('genDiff(%#)', (a, b, expected, format = '') => {
  expect(genDiff(a, b, format)).toBe(expected);
});
