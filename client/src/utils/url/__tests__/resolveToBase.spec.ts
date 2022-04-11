/* eslint-disable max-len */
import resolveToBase from '../resolveToBase';

describe('resolveToBase test suite', () => {
  test('should throw an error if path includes "." or ".."', () => {
    let error;
    try {
      resolveToBase('./index.html', '.');
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();

    error = undefined;
    try {
      resolveToBase('../index.html', '.');
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  test('should throw an error if path is an absolution path', () => {
    let error;
    try {
      resolveToBase('/index.html', '.');
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  test('should return path directly if base is an empty string or "."', () => {
    expect(resolveToBase('index.html', '')).toBe('index.html');
    expect(resolveToBase('index.html', '.')).toBe('index.html');
  });

  test('should append path to base if base is an absolute path', () => {
    expect(resolveToBase('index.html', '/public')).toBe('/public/index.html');
    expect(resolveToBase('index.html', '/public/')).toBe('/public/index.html');
    expect(resolveToBase('index.html', 'https://rexcheng1997.github.io/tensorhero-frontend'))
        .toBe('https://rexcheng1997.github.io/tensorhero-frontend/index.html');
    expect(resolveToBase('index.html', 'https://rexcheng1997.github.io/tensorhero-frontend/'))
        .toBe('https://rexcheng1997.github.io/tensorhero-frontend/index.html');
  });

  test('should resolve path correctly when base does not contain "." or ".."', () => {
    window.location.assign('https://rexcheng1997.github.io/tensorhero-frontend/');
    expect(resolveToBase('home.html', 'public/'))
        .toBe('/tensorhero-frontend/public/home.html');

    window.location.assign('https://rexcheng1997.github.io/tensorhero-frontend/index.html');
    expect(resolveToBase('about.html', 'public/'))
        .toBe('/tensorhero-frontend/public/about.html');
  });

  test('should resolve path correctly when base contains "." or ".."', () => {
    window.location.assign('https://rexcheng1997.github.io/tensorhero-frontend/');
    expect(resolveToBase('home.html', './public/'))
        .toBe('/tensorhero-frontend/public/home.html');

    window.location.assign('https://rexcheng1997.github.io/tensorhero-frontend/public/home.html');
    expect(resolveToBase('index.html', '../'))
        .toBe('/tensorhero-frontend/index.html');
  });
});
