import _ from 'lodash';

const stringify = (val) => {
  const isString = typeof val === 'string';
  const isObject = val instanceof Object;

  if (isObject) {
    return '[complex value]';
  }

  return isString ? `'${val}'` : val;
};

const templates = [
  {
    status: 'unchanged',
    getPart: () => [],
  },
  {
    status: 'changed',
    getPart: ([key, value, newValue], path) => (
      `Property '${path}${key}' was changed from ${stringify(value)} to ${stringify(newValue)}`
    ),
  },
  {
    status: 'added',
    getPart: ([key, value], path) => (
      `Property '${path}${key}' was added with value: ${stringify(value)}`
    ),
  },
  {
    status: 'deleted',
    getPart: ([key], path) => (
      `Property '${path}${key}' was deleted`
    ),
  },
];

const getBuilderOfPart = (arg) => templates
  .find(({ status }) => (status === arg));

const renderPlain = (ast) => {
  const iter = (data, mainAcc, path) => {
    return data.reduce((acc, [status, ...rest]) => {
      const [key, value] = rest;
      const { getPart } = getBuilderOfPart(status);

      if (value instanceof Array) {
        const newPath = `${key}.`;
        return iter(value, acc, newPath);
      }

      return [...acc, getPart(rest, path)];
    }, mainAcc);
  };

  const innerValue = iter(ast, [], '');
  const resultValue = _.flatten(innerValue).map((val) => `${val}\n`);

  return resultValue.join('').trim();
};

export default renderPlain;
