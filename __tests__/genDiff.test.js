
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs
  .readFileSync(getFixturePath(filename), 'utf-8');

const beforePlain = JSON.parse(readFile('before-plain.json'));
const afterPlain = JSON.parse(readFile('after-plain.json'));

const beforeRecursion = JSON.parse(readFile('before.json'));
const afterRecursion = JSON.parse(readFile('after.json'));

const beforeYaml = yaml.safeLoad(readFile('before.yml'));
const afterYaml = yaml.safeLoad(readFile('after.yml'));

const beforeIni = ini.parse(readFile('before.ini'));
const afterIni = ini.parse(readFile('after.ini'));

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
