import parse from './parse';
import formatters from './formatters';

const genDiff = (before, after, format = '') => {
  const ast = parse(before, after);
  const result = formatters(ast, format);

  return result;
};

export default genDiff;
