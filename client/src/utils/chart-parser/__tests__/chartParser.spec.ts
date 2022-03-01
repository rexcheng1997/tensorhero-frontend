/* eslint-disable max-len */
import fs from 'fs';
import parseChartFile from '../chartParser';
import { ChartObjectInterface } from '../interface';
import correctResults from './mockData/correctResults';

describe('chartParser.ts test suite', () => {
  test.each(Object.keys(correctResults).map(
      (testName: string): [string, string, ChartObjectInterface] => [
        testName,
        fs.readFileSync(`${__dirname}/mockData/${testName}.chart`).toString(),
        correctResults[testName],
      ]))(
      'should parse %s.chart correctly', (
          _testName: string,
          chartFile: string,
          correctResult: ChartObjectInterface,
      ) => {
        expect(parseChartFile(chartFile)).toEqual(correctResult);
      },
  );

  test('should throw an error if input chart file is not well-formatted (containing unknown section)', () => {
    try {
      parseChartFile(fs.readFileSync(`${__dirname}/mockData/test6.chart`).toString());
    } catch (error) {
      expect(error).toEqual(new Error('Unknown section in the chart file: [UnknownSection]'));
    }
  });
});
