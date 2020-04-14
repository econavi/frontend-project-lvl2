import _ from 'lodash';

const checkIsObject = (value) => value instanceof Object;

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortedUniq(keys.sort());

  return sortedKeys.reduce((acc, key) => {
    const value1 = checkIsObject(data1[key]) ? { ...data1[key] } : data1[key];
    const value2 = checkIsObject(data2[key]) ? { ...data2[key] } : data2[key];

    if (checkIsObject(value1) && checkIsObject(value2)) {
      return [
        ...acc,
        { status: 'unchanged', key, value: buildTree(value1, value2) },
      ];
    }

    if (!_.has(data2, key)) {
      return [...acc, { status: 'deleted', key, value: value1 }];
    }

    if (!_.has(data1, key)) {
      return [...acc, { status: 'added', key, value: value2 }];
    }

    if (value1 !== value2) {
      return [
        ...acc,
        {
          status: 'changed', key, value: value1, newValue: value2,
        },
      ];
    }

    return [...acc, { status: 'unchanged', key, value: value1 }];
  }, []);
};

export default buildTree;
