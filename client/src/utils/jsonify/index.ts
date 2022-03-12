import _ from 'lodash';

/**
 * Converts an object to a JSON string with pretty format
 * @param {Object} object an object that can be serialized to JSON
 * @param {number} spaces number of whitespaces
 * @return {string} pretty-formated JSON string
 */
export function prettyPrintToHTML(
    object: Object,
    spaces: number = 4,
): string {
  if (_.isNil(object)) return '';

  return JSON.stringify(object, null, spaces)
      .replace(/\n/g, '<br>')
      .replace(/\s/g, '&nbsp;');
};
