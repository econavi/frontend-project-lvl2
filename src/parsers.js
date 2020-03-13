import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = (config) => {
  const file = fs.readFileSync(config);
  const extname = path.extname(config);

  let parser;
  if (extname === '.json') {
    parser = JSON.parse;
  } else if (extname === '.yml') {
    parser = yaml.safeLoad;
  }

  return parser(file);
};

export default parsers;
