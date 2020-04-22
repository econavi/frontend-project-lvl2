import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (fileData, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(fileData);

    case '.yml':
      return yaml.safeLoad(fileData);

    case '.ini':
      return ini.parse(fileData);

    default:
      throw new Error(`Wrong file extension — ${extName}`);
  }
};

export default parsers;
