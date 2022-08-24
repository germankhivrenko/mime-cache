import assert from 'node:assert/strict';
import {LRUCache} from './lru-cache.js';

describe('LRUCache', function() {
  it('throws if max size is non-positive', function() {
    assert.throws(() => new LRUCache(-1), {
      name: 'Error',
      message: 'Max size must be positive number'
    });
  });

  it('throws if item is not buffer', function() {
    const cache = new LRUCache(1024);

    assert.throws(() => cache.set('key', 'I am not a Buffer'), {
      name: 'Error',
      message: 'Given value is not a Buffer'
    });
  });

  it('throws if item size is bigger than max size', function() {
    const cache = new LRUCache(8);
    const item = Buffer.from('Hello World!'); // 12 bytes

    assert.throws(() => cache.set('key', item), {
      name: 'Error',
      message: 'Item size is greated than the max size'
    });
  });

  it('evicts lru cache item', function() {
    const item1 = Buffer.from('1');
    const item2 = Buffer.from('2');
    const item3 = Buffer.from('3');

    const cache = new LRUCache(2);

    cache.set('key1', item1);
    cache.set('key2', item2);

    cache.get('key1');

    cache.set('key3', item3);

    const cacheItem1 = cache.get('key1');
    const cacheItem2 = cache.get('key2');
    const cacheItem3 = cache.get('key3');

    assert(cacheItem1.equals(Buffer.from('1')));
    assert.equal(cacheItem2, undefined);
    assert(cacheItem3.equals(Buffer.from('3')));
  });
});
