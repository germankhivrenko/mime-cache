import {LRUCache} from './lru-cache.js';

class CachedFetcher {
  #fetcher;
  #logger;
  #cache;

  constructor(fetcher, logger, {cacheSize} = {}) {
    const defaultCacheSize = 50 * 1024;

    this.#fetcher = fetcher;
    this.#logger = logger;
    this.#cache = new LRUCache(cacheSize || defaultCacheSize);
  }

  async fetch(url) {
    const cacheItem = this.#cache.get(url);

    if (cacheItem) {
      this.#logger.log(`IN CACHE, bytes: ${Buffer.byteLength(cacheItem)}`);
      return cacheItem;
    }

    const item = await this.#fetcher.fetch(url);
    this.#cache.set(url, item);

    return item;
  }
}

export {CachedFetcher};

