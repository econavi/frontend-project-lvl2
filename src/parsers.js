import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

import { readFile } from './utils';

const parsers = (config) => {
  const dataFile = readFile(config);
  const extname = path.extname(config);

  let parser;
  if (extname === '.json') {
    parser = JSON.parse;
  }

  if (extname === '.yml') {
    parser = yaml.safeLoad;
  }

  if (extname === '.ini') {
    parser = ini.parse;
  }

  return parser(dataFile);
};

export default parsers;
