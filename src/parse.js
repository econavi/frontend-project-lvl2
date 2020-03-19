import _ from 'lodash';

const checkIsObject = (value) => value instanceof Object;

const parse = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  const sortedKeys = _.sortedUniq(keys.sort());

  return sortedKeys.reduce((acc, key) => {
    const value1 = checkIsObject(data1[key]) ? { ...data1[key] } : data1[key];
    const value2 = checkIsObject(data2[key]) ? { ...data2[key] } : data2[key];

    if (checkIsObject(value1) && checkIsObject(value2)) {
      return [
        ...acc,
        ['unchanged', key, parse(value1, value2)],
      ];
    }

    if (!_.has(data2, key)) {
      return [...acc, ['deleted', key, value1]];
    }

    if (!_.has(data1, key)) {
      return [...acc, ['added', key, value2]];
    }

    if (value1 !== value2) {
      return [...acc, ['changed', key, value1, value2]];
    }

    return [...acc, ['unchanged', key, value1]];
  }, []);
};

export default parse;
