const stringify = (val) => {
  const isString = typeof val === 'string';
  const isObject = val instanceof Object;
  if (isObject) return '[complex value]';
  return isString ? `'${val}'` : val;
};

const renderPlain = (ast) => {
  const iter = (data, path) => data
    .flatMap((partData) => {
      const {
        status, key, value, oldValue, newValue, children,
      } = partData;

      switch (status) {
        case 'added':
          return `Property '${path}${key}' was added with value: ${stringify(value)}`;

        case 'deleted':
          return `Property '${path}${key}' was deleted`;

        case 'changed':
          return `Property '${path}${key}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`;

        case 'unchanged':
          return [];

        case 'tree':
          return iter(children, `${key}.`);

        default:
          throw new Error(`Wrong type node — ${status}`);
      }
    });

  const innerValue = iter(ast, '');
  return innerValue.join('\n');
};

export default renderPlain;
