import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);

    case 'yml':
      return yaml.safeLoad(data);

    case 'ini':
      return ini.parse(data);

    default:
      throw new Error(`Wrong data type — ${type}`);
  }
};

export default parsers;
