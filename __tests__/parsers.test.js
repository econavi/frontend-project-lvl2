import path from 'path';
import parsers from '../src/parsers.js';

test('parsers', () => {
  const dataJson = path.join(__dirname, '..', 'fixtures', 'before.json');
  const dataYaml = path.join(__dirname, '..', 'fixtures', 'before.yml');
  const dataIni = path.join(__dirname, '..', 'fixtures', 'before.ini');

  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const expectedFromIni = {
    host: 'hexlet.io',
    timeout: '50',
    proxy: '123.234.53.22',
    follow: false,
  };

  expect(parsers(dataJson)).toEqual(expected);
  expect(parsers(dataYaml)).toEqual(expected);
  expect(parsers(dataIni)).toEqual(expectedFromIni);
});
