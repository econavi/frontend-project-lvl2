import _ from 'lodash';

const checkIsObject = (value) => value instanceof Object;

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const tree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (checkIsObject(value1) && checkIsObject(value2)) {
      return { status: 'unchanged', key, value: buildTree(value1, value2) };
    }

    if (!_.has(data2, key)) {
      return { status: 'deleted', key, value: value1 };
    }

    if (!_.has(data1, key)) {
      return { status: 'added', key, value: value2 };
    }

    if (value1 !== value2) {
      return {
        status: 'changed', key, oldValue: value1, newValue: value2,
      };
    }

    return { status: 'unchanged', key, value: value1 };
  });

  return tree;
};

export default buildTree;
