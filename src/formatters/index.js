import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = (data, format = '') => {
  if (format === 'plain') {
    return renderPlain(data, 'plain');
  }

  if (format === 'json') {
    return renderJson(data, 'json');
  }

  return renderDefault(data);
};

export default formatters;
