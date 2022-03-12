import formatTimestamp from '../formatTimestamp';

describe('formatTimestamp test suite', () => {
  test('should format 0s to "00:00"', () => {
    expect(formatTimestamp(0)).toBe('00:00');
  });

  test('should format 35s to "00:35"', () => {
    expect(formatTimestamp(35)).toBe('00:35');
  });

  test('should format 122s to "02:02"', () => {
    expect(formatTimestamp(122)).toBe('02:02');
  });

  test('should format 1682s to "28:02"', () => {
    expect(formatTimestamp(1682)).toBe('28:02');
  });

  test('should format 16.289s to "00:16"', () => {
    expect(formatTimestamp(16.289)).toBe('00:16');
  });
});
