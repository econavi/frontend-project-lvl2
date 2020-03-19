import parse from './parse';
import render from './render';

const genDiff = (before, after) => {
  const ast = parse(before, after);
  const result = render(ast);

  return result;
};

export default genDiff;
