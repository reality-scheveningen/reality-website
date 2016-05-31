'use strict';

let transformItem = function (item, locale) {
  if (item instanceof Object && item.fields) {
    return transformer(item.fields, locale);
  }

  return item;
};

let transformer = function (fields, locale) {
  let result = {};
  for(let property in fields) {
    if (fields.hasOwnProperty(property) && fields[property][locale]) {
      if (fields[property][locale] instanceof Array) {
        result[property] = [];
        for (let key in fields[property][locale]) {
           result[property].push(
             transformItem(fields[property][locale][key], locale)
           );
        }
      } else {
        result[property] = transformItem(fields[property][locale], locale);
      }
    } else {
      result[property] = fields[property];
    }
  }

  return result;
};

module.exports = transformer;
