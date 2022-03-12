/* eslint-disable max-len */
import {
  clipBetween,
  linear,
} from '../arithmetics';

describe('arithmetics test suite', () => {
  test('linear should return correct linear interpolation: y = 2x + 7', () => {
    const interpolation = linear(2, 7);

    expect(interpolation(0)).toBe(7);
    expect(interpolation(1)).toBe(9);
    expect(interpolation(3)).toBe(13);
  });

  test('linear should return correct linear interpolation: y = -3x + 1', () => {
    const interpolation = linear(-3, 1);

    expect(interpolation(0)).toBe(1);
    expect(interpolation(1)).toBe(-2);
    expect(interpolation(-2)).toBe(7);
  });

  test('clipBetween should do nothing if the value passed in is already within the range', () => {
    expect(clipBetween(12, -3, 20)).toBe(12);
    expect(clipBetween(5, 0, 30)).toBe(5);
  });

  test('clipBetween should clip the value to the left boundary if value falls to the left of the range', () => {
    expect(clipBetween(-5, 0, 20)).toBe(0);
  });

  test('clipBetween should clip the value to the right boundary if value falls to the right of the range', () => {
    expect(clipBetween(100, 0, 20)).toBe(20);
  });

  test('clipBetween should throw an error if argument "from" is greater than argument "to"', () => {
    try {
      clipBetween(7, 20, 3);
    } catch (error) {
      expect(error).toEqual(
          new Error('clipBetween expects "from" (20) to be less than or equal to "to" (3)'),
      );
    }
  });
});
