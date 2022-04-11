/**
 * Resolves the path to the given base relative to current window location
 * @param {string} path the relative path to resolve
 * @param {string} base the relative base to current window location
 * @return {string}
 */
export default function resolveToBase(path: string, base: string): string {
  if (path.startsWith('.')) {
    throw new Error(
        'path cannot start with "." or ".." (put them in base instead)',
    );
  }

  if (path.startsWith('/')) {
    throw new Error('path should be relative');
  }

  if (base.length === 0 || base === '.') return path;
  if (base.startsWith('http') || base.startsWith('/')) {
    return base[base.length - 1] === '/' ? base + path : base + '/' + path;
  }

  const components = base.split('/');

  if (components[components.length - 1] === '') components.pop();

  const url = new URL(window.location.href);
  const stack = url.pathname.split('/');

  if (stack[stack.length - 1] === '' ||
    stack[stack.length - 1].endsWith('.html')
  ) {
    stack.pop();
  }

  for (const component of components) {
    switch (component) {
      case '.':
        break;

      case '..':
        if (stack.length > 0) stack.pop();
        break;

      default:
        stack.push(component);
    }
  }

  stack.push(path);

  return stack.join('/');
};
