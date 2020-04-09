import fs from 'fs';

import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (filePath) => {
  const dataFile = fs.readFileSync(filePath, 'utf-8');
  const extname = path.extname(filePath);

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
