/* eslint-disable max-len */
import * as jsonify from '../';
import prettyPrintToHTMLTests from './mockData/prettyPrintToHTML';

describe('jsonify utilities test suite', () => {
  test('should return an empty string if the object passed in is undefined or null', () => {
    expect(jsonify.prettyPrintToHTML(undefined as unknown as Object)).toBe('');
    expect(jsonify.prettyPrintToHTML(null as unknown as Object)).toBe('');
  });

  test('should return "{}" if the object passed in is an empty Object', () => {
    expect(jsonify.prettyPrintToHTML({})).toBe('{}');
  });

  test.each(Object.entries(prettyPrintToHTMLTests))(
      'should convert object %s to a JSON string with correct formatting',
      (_testName, testData) => {
        expect(jsonify.prettyPrintToHTML(testData.data, testData.spaces)).toBe(testData.result);
      },
  );
});
