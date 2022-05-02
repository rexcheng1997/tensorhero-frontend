import formatBigNumber from '../formatBigNumber';

describe('formatBigNumber test suite', () => {
  test('formatBigNumber(123) = "123"', () => {
    expect(formatBigNumber(123)).toBe('123');
  });

  test('formatBigNumber(1234) = "1.2k"', () => {
    expect(formatBigNumber(1234)).toBe('1.2k');
  });

  test('formatBigNumber(12345) = "12.3k"', () => {
    expect(formatBigNumber(12345)).toBe('12.3k');
  });

  test('formatBigNumber(1234567) = "1.2m', () => {
    expect(formatBigNumber(1234567)).toBe('1.2m');
  });

  test('formatBigNumber(1234567890) = "1.2b"', () => {
    expect(formatBigNumber(1234567890)).toBe('1.2b');
  });
});
