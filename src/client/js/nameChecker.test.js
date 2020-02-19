const nameChecker = require('./nameChecker')


test('Checks for valid url', () => {
    expect(nameChecker('https://en.wiktionary.org/wiki/static')).toBe('none');
  });

test('Checks for invalid url', () => {
expect(nameChecker('notAurl')).toBe('Invalid URL');
});
  