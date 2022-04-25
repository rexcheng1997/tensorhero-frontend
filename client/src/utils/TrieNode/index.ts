/**
 * TrieNode class
 * Understands the basic functionality of a Trie
 */
export default class TrieNode<T> {
  private readonly children: Map<string, TrieNode<T>>;
  private readonly data: T[];

  /**
   * Creates a new instance of a TrieNode
   */
  constructor() {
    this.children = new Map<string, TrieNode<T>>();
    this.data = [];
  }

  /**
   * Add a key-value pair into the trie
   * @param {string} key used to index the trie
   * @param {T} value reference to the data corresponding to the key
   * @return {TrieNode<T>}
   */
  public add(key: string, value: T): TrieNode<T> {
    let current: TrieNode<T> = this;
    for (let char of key) {
      char = char.toLowerCase();

      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode<T>());
      }

      current = current.children.get(char)!;

      if (!current.data.includes(value)) {
        current.data.push(value);
      }
    }

    return current;
  }

  /**
   * Add a phrase(delimited by delimiter)-value pair into the trie
   * @param {string} phrase used to index the trie
   * @param {T} value reference to the data corresponding to the key
   * @param {string | RegExp} delimiter used to split the phrase
   * @return {TrieNode<T>}
   */
  public addPhrase(
      phrase: string,
      value: T,
      delimiter: string | RegExp = ' ',
  ): TrieNode<T> {
    this.add(phrase, value); // add the entire phrase as key as well

    for (const key of phrase.split(delimiter)) {
      this.add(key, value);
    }

    return this;
  }

  /**
   * Lookup the data by key
   * @param {string} key used to index the trie
   * @return {T[]}
   */
  public lookup(key: string): T[] {
    let current: TrieNode<T> = this;
    for (const char of key) {
      if (!current.children.has(char)) return [];

      current = current.children.get(char)!;
    }

    return current.data;
  }

  /**
   * Lookup the data by phrase
   * @param {string} phrase used to index the trie
   * @param {string | RegExp} delimiter used to split the phrase
   * @return {T[]}
   */
  public searchPhrase(
      phrase: string,
      delimiter: string | RegExp = ' ',
  ): T[] {
    const keys = phrase.split(delimiter);
    let intersection = this.lookup(keys[0]);

    for (let i = 1; i < keys.length; i++) {
      const result = new Set(this.lookup(keys[i]));
      intersection = intersection.filter((value) => result.has(value));
    }

    intersection.push(...this.lookup(phrase).filter(
        (value) => !intersection.includes(value),
    ));

    return intersection;
  }
};
