import renderStylish from './renderStylish';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = (data, format) => {
  if (format === 'plain') {
    return renderPlain(data, 'plain');
  }

  if (format === 'json') {
    return renderJson(data, 'json');
  }

  return renderStylish(data);
};

export default formatters;
