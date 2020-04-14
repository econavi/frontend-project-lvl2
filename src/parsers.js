import fs from 'fs';

import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (filePath) => {
  const dataFile = fs.readFileSync(filePath, 'utf-8');
  const extname = path.extname(filePath);

  switch (extname) {
    case '.json':
      return JSON.parse(dataFile);

    case '.yml':
      return yaml.safeLoad(dataFile);

    case '.ini':
      return ini.parse(dataFile);

    default:
      throw new Error('Wrong file format');
  }
};

export default parsers;
