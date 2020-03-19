import parse from '../src/parse';

test('parse', () => {
  const data1 = {
    setting1: 'Value 1',
    setting2: '200',
    setting4: '300',
  };

  const data2 = {
    setting1: 'Value 2',
    setting2: '200',
    setting3: true,
  };

  const expected = [
    ['changed', 'setting1', 'Value 1', 'Value 2'],
    ['unchanged', 'setting2', '200'],
    ['added', 'setting3', true],
    ['deleted', 'setting4', '300'],
  ];

  expect(parse(data1, data2)).toEqual(expected);
});

test('deep parse', () => {
  const data1 = {
    setting1: 'Value 1',
    setting2: '200',
    setting3: {
      deepkey1: 'aaa',
      deepkey2: '55',
      deepkey3: {
        deeperkey1: true,
        deeperkey2: false,
        deeperkey3: '',
      },
    },
    setting4: '300',
  };

  const data2 = {
    setting1: 'Value 2',
    setting2: '200',
    setting3: {
      deepkey1: 'bbb',
      deepkey2: '55',
      deepkey3: {
        deeperkey1: true,
        deeperkey2: 123,
        deeperkey4: 'val',
      },
    },
    setting5: true,
  };

  const expected = [
    ['changed', 'setting1', 'Value 1', 'Value 2'],
    ['unchanged', 'setting2', '200'],
    ['unchanged', 'setting3', [
      ['changed', 'deepkey1', 'aaa', 'bbb'],
      ['unchanged', 'deepkey2', '55'],
      ['unchanged', 'deepkey3', [
        ['unchanged', 'deeperkey1', true],
        ['changed', 'deeperkey2', false, 123],
        ['deleted', 'deeperkey3', ''],
        ['added', 'deeperkey4', 'val'],
      ]],
    ]],
    ['deleted', 'setting4', '300'],
    ['added', 'setting5', true],
  ];

  expect(parse(data1, data2)).toEqual(expected);
});
