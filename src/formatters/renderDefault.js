import _ from 'lodash';

const stringify = (val, space = '') => {
  if (!(val instanceof Object)) {
    return val;
  }

  const result = Object.entries(val)
    .reduce((acc, [key, value]) => (
      `${acc}\n      ${space}${key}: ${value}`
    ), '');

  return `{${result}\n${space}  }`;
};

const templates = [
  {
    status: 'unchanged',
    getPart: ([key, value], space) => [
      `${space}  ${key}: ${stringify(value, space)}`,
    ],
  },
  {
    status: 'changed',
    getPart: ([key, value, newValue], space) => (
      [
        `${space}- ${key}: ${stringify(value, space)}`,
        `${space}+ ${key}: ${stringify(newValue, space)}`,
      ]
    ),
  },
  {
    status: 'added',
    getPart: ([key, value], space) => [`${space}+ ${key}: ${stringify(value, space)}`],
  },
  {
    status: 'deleted',
    getPart: ([key, value], space) => [`${space}- ${key}: ${stringify(value, space)}`],
  },
];

const getBuilderOfPart = (arg) => templates
  .find(({ status }) => (status === arg));

const renderDefault = (data, spaceLengthOption = 2) => {
  const buildParts = (partsData, _depth = 1) => {
    let depthLevelCounter = _depth;

    return partsData.reduce((acc, [status, ...rest]) => {
      const spacesString = ' '.repeat(depthLevelCounter * spaceLengthOption);

      const { getPart } = getBuilderOfPart(status);
      const [key, value] = rest;

      if (value instanceof Array) {
        depthLevelCounter += spaceLengthOption;
        const newAcc = [
          ...acc,
          `${getPart([key, ''], spacesString)}{`,
          buildParts(value, depthLevelCounter),
          `${spacesString}  }`,
        ];
        depthLevelCounter -= spaceLengthOption;
        return newAcc;
      }

      const build = [...acc, getPart(rest, spacesString)];
      return _.flatten(build);
    }, []);
  };

  const innerValue = ['{', ...buildParts(data), '}'].map((el) => `${el}\n`);
  const result = innerValue.join('').trim();

  return result;
};

export default renderDefault;
