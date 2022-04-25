import TrieNode from '.';

describe('TrieNode test suite', () => {
  type Data = {
    id: number,
    value: string,
  };

  it('should add a key-value pair correctly into the trie', () => {
    const trie = new TrieNode<Data>();
    const data: Data = { id: 1, value: 'test-value' };

    trie.add('test-key', data);

    expect(trie.lookup('t')).toEqual([data]);
    expect(trie.lookup('te')).toEqual([data]);
    expect(trie.lookup('tes')).toEqual([data]);
    expect(trie.lookup('test')).toEqual([data]);
    expect(trie.lookup('test-')).toEqual([data]);
    expect(trie.lookup('test-k')).toEqual([data]);
    expect(trie.lookup('test-ke')).toEqual([data]);
    expect(trie.lookup('test-key')).toEqual([data]);

    expect(trie.lookup('a')).toEqual([]);
    expect(trie.lookup('test-key-null')).toEqual([]);
  });

  it('should add multiple key-value pairs correctly into the trie', () => {
    const trie = new TrieNode<Data>();
    const data: [string, Data][] = [[
      'test-key-1', {
        id: 1, value: 'test-value-1',
      },
    ], [
      'test-key-2', {
        id: 2, value: 'test-value-2',
      },
    ], [
      'test-key-3', {
        id: 3, value: 'test-value-3',
      },
    ], [
      'some-other-key', {
        id: 4, value: 'test-value-4',
      },
    ]];

    data.forEach(([key, value]) => trie.add(key, value));

    expect(trie.lookup('test')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.lookup('test-key')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.lookup('test-key-3')).toEqual([data[2][1]]);
    expect(trie.lookup('some-other')).toEqual([data[3][1]]);
    expect(trie.lookup('key')).toEqual([]);
  });

  it('should add a phrase-value pair correctly into the trie', () => {
    const trie = new TrieNode<Data>();
    const data: Data = { id: 1, value: 'test-value' };

    trie.addPhrase('this is a phrase', data);

    expect(trie.searchPhrase('is')).toEqual([data]);
    expect(trie.searchPhrase('this is')).toEqual([data]);
    expect(trie.searchPhrase('is a phrase')).toEqual([data]);
    expect(trie.searchPhrase('this is a phrase')).toEqual([data]);
    expect(trie.searchPhrase('phrase is')).toEqual([data]);
    expect(trie.searchPhrase('something else')).toEqual([]);
  });

  it('should add multiple phrase-value pair correctly into the trie', () => {
    const trie = new TrieNode<Data>();
    const data: [string, Data][] = [[
      'this is a phrase', {
        id: 1, value: 'test-value-1',
      },
    ], [
      'this is a cat', {
        id: 2, value: 'test-value-2',
      },
    ], [
      'this is a dog', {
        id: 3, value: 'test-value-3',
      },
    ], [
      'something else', {
        id: 4, value: 'test-value-4',
      },
    ]];

    data.forEach(([key, value]) => trie.addPhrase(key, value));

    expect(trie.searchPhrase('a')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.searchPhrase('th')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.searchPhrase('this')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.searchPhrase('this is')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.searchPhrase('is this')).toEqual(
        data.slice(0, -1).map(([, value]) => value),
    );
    expect(trie.searchPhrase('a cat')).toEqual([data[1][1]]);
    expect(trie.searchPhrase('a dog')).toEqual([data[2][1]]);
    expect(trie.searchPhrase('some')).toEqual([data[3][1]]);
    expect(trie.searchPhrase('a mouse')).toEqual([]);
    expect(trie.searchPhrase('it is awesome')).toEqual([]);
  });
});
