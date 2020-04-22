import _ from 'lodash';

const stringify = (val) => {
  const isString = typeof val === 'string';
  const isObject = val instanceof Object;
  if (isObject) return '[complex value]';
  return isString ? `'${val}'` : val;
};

const renderPlain = (ast) => {
  const iter = (data, initialAcc, path) => data
    .reduce((acc, partData) => {
      const {
        status, key, value, oldValue, newValue,
      } = partData;

      if (value instanceof Array) {
        const newPath = `${key}.`;
        return iter(value, acc, newPath);
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
    }, initialAcc);

  const innerValue = iter(ast, [], '');
  const resultValue = _.flatten(innerValue).map((val) => `${val}\n`);

  return resultValue.join('').trim();
};

export default renderPlain;
