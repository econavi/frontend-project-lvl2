import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (config) => {
  const file = fs.readFileSync(config, 'utf-8');
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

  return parser(file);
};

export default parsers;
