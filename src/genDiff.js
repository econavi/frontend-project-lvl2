import _ from 'lodash';

const genDiff = (before, after) => {
  const astBefore = Object.entries(before).reduce((acc, [key, value]) => {
    if (_.has(after, key)) {
      if (value === after[key]) {
        return {
          ...acc,
          [key]: {
            status: 'nothing',
            value,
          },
        };
      }

      return {
        ...acc,
        [key]: {
          status: 'change',
          value: [value, after[key]],
        },
      };
    }

    return {
      ...acc,
      [key]: {
        status: 'deleted',
        value,
      },
    };
  }, {});

  const astAfter = Object.entries(after).reduce((acc, [key, value]) => {
    if (!(_.has(astBefore, key))) {
      return {
        ...acc,
        [key]: {
          status: 'added',
          value,
        },
      };
    }

    return acc;
  }, {});

  const ast = { ...astBefore, ...astAfter };

  const result = Object.entries(ast).reduce((acc, [key, elem]) => {
    if (elem.status === 'nothing') {
      return `${acc}\n${key}: ${elem.value}`;
    }

    if (elem.status === 'change') {
      return `${acc}\n- ${key}: ${elem.value[0]}\n+ ${key}: ${elem.value[1]}`;
    }

    if (elem.status === 'deleted') {
      return `${acc}\n- ${key}: ${elem.value}`;
    }

    return `${acc}\n+ ${key}: ${elem.value}`;
  }, '');

  return result;
};

export default genDiff;
