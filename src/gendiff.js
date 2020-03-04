#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const process = require('process');

const commander = require('commander');
const _ = require('lodash');

const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format [type]', 'output format');

const getDiff = (before, after) => {
  const astBefore = Object.entries(before).reduce((acc, [key, value]) => {
    if (_.has(after, key)) {
      if (value === after[key]) {
        return {
          ...acc, 
          [key]: { 
            status: 'nothing', 
            value,
          },
        };
      } else {
        return {
          ...acc, 
          [key]: {
            status: 'change', 
            value: [value, after[key]]
          }
        }
      }
    }

    return {
      ...acc,
      [key]: {
        status: 'deleted',
        value,
      }
    }
  }, {});

  const astAfter = Object.entries(after).reduce((acc, [key, value]) => {   
    if (!(_.has(astBefore, key))) {
      return {
        ...acc,
        [key]: {
          status: 'added',
          value,
        },
      }
    }

    return acc;
  }, {});

  const ast = { ...astBefore, ...astAfter };

  const result = Object.entries(ast).reduce((acc, [key, elem]) => {
    if (elem.status === 'nothing') {
      return `${acc}\n${key}: ${elem.value}`;
    }

    if (elem.status === 'change') {
      return `${acc}\n- ${key}: ${elem.value[0]}\n+ ${key}: ${elem.value[1]}`;
    }

    if (elem.status === 'deleted') {
      return `${acc}\n- ${key}: ${elem.value}`;
    }

    return `${acc}\n+ ${key}: ${elem.value}`;
  }, '');

  return result;  
};

program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  const before = JSON.parse(fs.readFileSync(firstConfig));
  const after = JSON.parse(fs.readFileSync(secondConfig));

  const result = getDiff(before, after);
  console.log(result);
  
});

program.parse(process.argv);
