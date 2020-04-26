import _ from 'lodash';

const stringify = (val) => {
  const isString = typeof val === 'string';
  const isObject = val instanceof Object;
  if (isObject) return '[complex value]';
  return isString ? `'${val}'` : val;
};

const renderPlain = (ast) => {
  const iter = (data, acc, path) => data
    .map((partData) => {
      const {
        status, key, value, oldValue, newValue, children,
      } = partData;

      if (children.length) {
        const newPath = `${key}.`;
        return iter(children, acc, newPath);
      }

      if (status === 'changed') {
        return [
          ...acc,
          (`Property '${path}${key}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`),
        ];
      }

      if (status === 'added') {
        return [...acc, `Property '${path}${key}' was added with value: ${stringify(value)}`];
      }

      if (status === 'deleted') {
        return [...acc, `Property '${path}${key}' was deleted`];
      }

      return acc;
    });

  const innerValue = iter(ast, [], '');
  const resultValue = _.flattenDeep(innerValue).filter((v) => v);

  return resultValue.join('\n').trim();
};

export default renderPlain;
