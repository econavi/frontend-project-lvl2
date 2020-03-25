import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const formatters = (data, format = '') => {
  if (format === 'plain') {
    return renderPlain(data, 'plain');
  }

  return renderDefault(data);
};

export default formatters;
