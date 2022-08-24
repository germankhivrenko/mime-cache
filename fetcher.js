import undici from 'undici';
import {LRUCache} from './lru-cache.js';

class Fetcher {
  #cache;

  constructor() {
    this.#cache = new LRUCache(50 * 1024);
  }

  async fetch(url) {
    const item = this.#cache.get(url);

    if (item) {
      console.log(`IN CACHE, bytes: ${Buffer.byteLength(item)}`);
      return item;
    }

    const response = await undici.fetch(url);
    const buff = await this.#toBuffer(response.body);
    console.log(`DOWLOADED, bytes: ${Buffer.byteLength(buff)}`);
    
    this.#cache.set(url, buff);

    return item;
  }

  async #toBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    return Buffer.concat(chunks);
  }
}

export {Fetcher};
