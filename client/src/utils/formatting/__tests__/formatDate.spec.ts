import formatDate from '../formatDate';

describe('formatDate test suite', () => {
  test('formatDate("2022-05-01T19:42:09.674Z") = "01 May 2022"', () => {
    expect(formatDate('2022-05-01T19:42:09.674Z')).toBe('1 May 2022');
  });

  test('formatDate("2022-03-12T13:41:29.674Z") = "12 Mar 2022"', () => {
    expect(formatDate('2022-03-12T13:41:29.674Z')).toBe('12 Mar 2022');
  });

  test('formatDate("2021-10-31T09:33:45.674Z") = "31 Oct 2021"', () => {
    expect(formatDate('2021-10-31T09:33:45.674Z')).toBe('31 Oct 2021');
  });
});
