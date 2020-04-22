import _ from 'lodash';

const stringify = (val, space) => (
  !(val instanceof Object) ? val : Object.entries(val)
    .reduce((acc, [key, value]) => (
      [...acc, `{\n${space}      ${key}: ${value}\n${space}  }`]
    ), [])
);

const getPart = function getPart(part, space) {
  const {
    status, key, value, oldValue, newValue,
  } = part;

  switch (status) {
    case 'changed':
      return [
        `${space}- ${key}: ${stringify(oldValue, space)}`,
        `${space}+ ${key}: ${stringify(newValue, space)}`,
      ];
    case 'added':
      return [`${space}+ ${key}: ${stringify(value, space)}`];
    case 'deleted':
      return [`${space}- ${key}: ${stringify(value, space)}`];
    default:
      return [`  ${space}${key}: ${stringify(value, space)}`];
  }
};

const renderStylish = (data) => {
  const buildParts = (tree, depth) => {
    const spaceLength = depth * 2;
    const space = ' '.repeat(spaceLength);

    return tree.reduce((acc, node) => {
      if (node.value instanceof Array) {
        return [
          ...acc,
          `  ${space}${node.key}: {`,
          buildParts(node.value, depth + 2),
          `  ${space}}`,
        ];
      }

      return [...acc, getPart(node, space)];
    }, []);
  };

  const parts = _.flattenDeep(buildParts(data, 1));

  return ['{', ...parts, '}']
    .map((el) => `${el}\n`)
    .join('')
    .trim();
};

export default renderStylish;
