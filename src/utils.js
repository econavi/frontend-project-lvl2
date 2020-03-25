import path from 'path';
import fs from 'fs';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export {
  getFixturePath,
  readFile,
};
