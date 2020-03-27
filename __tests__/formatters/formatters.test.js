import formatters from '../../src/formatters/index';

let data;

beforeAll(() => {
  data = [
    ['unchanged', 'group2', 'aaa'],
    ['unchanged', 'deep', [
      ['changed', 'deepgroup', 'val-4', 'val333'],
      ['unchanged', 'deeper', [
        [
          'changed',
          'deepergroup',
          11111111,
          {
            deeperobjkey1: 'obj-val-1',
            deeperobjkey2: 'obj-val-2',
          },
        ],
      ]],
    ]],
    ['added', 'group3', 100500],
    ['deleted', 'group4', 'bbb'],
    ['changed', 'group5', 'val1', 'val2'],
    ['added', 'group6', {
      objkey: 12345,
      objkey2: 'abcdefg',
    }],
  ];
});

test('render default', () => {
  const expected = [
    '{\n',
    '    group2: aaa\n',
    '    deep: {\n',
    '      - deepgroup: val-4\n',
    '      + deepgroup: val333\n',
    '        deeper: {\n',
    '          - deepergroup: 11111111\n',
    '          + deepergroup: {\n'
    + '                deeperobjkey1: obj-val-1\n'
    + '                deeperobjkey2: obj-val-2\n'
    + '            }\n',
    '        }\n',
    '    }\n',
    '  + group3: 100500\n',
    '  - group4: bbb\n',
    '  - group5: val1\n',
    '  + group5: val2\n',
    '  + group6: {\n        objkey: 12345\n        objkey2: abcdefg\n    }\n',
    '}\n',
  ].join('').trim();

  expect(formatters(data)).toBe(expected);
});

test('render plain', () => {
  const expected = [
    "Property 'deep.deepgroup' was changed from 'val-4' to 'val333'\n",
    "Property 'deeper.deepergroup' was changed from 11111111 to [complex value]\n",
    "Property 'group3' was added with value: 100500\n",
    "Property 'group4' was deleted\n",
    "Property 'group5' was changed from 'val1' to 'val2'\n",
    "Property 'group6' was added with value: [complex value]\n",
  ].join('').trim();

  expect(formatters(data, 'plain')).toBe(expected);
});

test('render json', () => {
  const expected = '[["unchanged","group2","aaa"],["unchanged","deep",[["changed","deepgroup","val-4","val333"],["unchanged","deeper",[["changed","deepergroup",11111111,{"deeperobjkey1":"obj-val-1","deeperobjkey2":"obj-val-2"}]]]]],["added","group3",100500],["deleted","group4","bbb"],["changed","group5","val1","val2"],["added","group6",{"objkey":12345,"objkey2":"abcdefg"}]]';

  expect(formatters(data, 'json')).toBe(expected);
});
