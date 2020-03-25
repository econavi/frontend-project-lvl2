import { getFixturePath } from '../src/utils';
import parsers from '../src/parsers.js';

test('parsers', () => {
  const dataJson = getFixturePath('before.json');
  const dataYaml = getFixturePath('before.yml');
  const dataIni = getFixturePath('before.ini');

  const expected = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { key: 'value' },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: 12345 },
  };

  const expectedFromIni = {
    common: {
      setting1: 'Value 1',
      setting2: '200',
      setting3: true,
      setting6: { key: 'value' },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: '12345' },
  };

  expect(parsers(dataJson)).toEqual(expected);
  expect(parsers(dataYaml)).toEqual(expected);
  expect(parsers(dataIni)).toEqual(expectedFromIni);
});
