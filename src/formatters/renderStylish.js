import _ from 'lodash';

const stringify = (val, space) => {
  if (!_.isObject(val)) {
    return val;
  }

  return Object.entries(val).map(([key, value]) => (
    [`{\n${space}      ${key}: ${value}\n${space}  }`]
  ));
};

const renderStylish = (data) => {
  const buildParts = (tree, depth) => {
    const spaceLength = depth * 2;
    const space = ' '.repeat(spaceLength);

    return tree.map((node) => {
      const {
        status, key, value, oldValue, newValue, children,
      } = node;

      switch (status) {
        case 'changed':
          return [
            `${space}- ${key}: ${stringify(oldValue, space)}`,
            `${space}+ ${key}: ${stringify(newValue, space)}`,
          ];

        case 'added':
          return `${space}+ ${key}: ${stringify(value, space)}`;

        case 'deleted':
          return `${space}- ${key}: ${stringify(value, space)}`;

        case 'unchanged':
          return children
            ? [
              `  ${space}${node.key}: {`,
              buildParts(node.children, depth + 2),
              `  ${space}}`,
            ]
            : `  ${space}${key}: ${stringify(value, space)}`;

        default:
          throw new Error(`Wrong type node — ${status}`);
      }
    });
  };

  const parts = _.flattenDeep(buildParts(data, 1));
  return ['{', ...parts, '}'].join('\n').trim();
};

export default renderStylish;
