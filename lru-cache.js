class LRUCache {
  #map;
  #size;
  #maxSize;

  constructor(maxSize) {
    if (maxSize <= 0) {
      throw new Error('Max size must be positive number');
    }

    this.#map = new Map();
    this.#size = 0;
    this.#maxSize = maxSize;
  }

  get(key) {
    const item = this.#map.get(key);

    if (!item) {
      return undefined;
    }

    this.#map.delete(key);
    this.#map.set(key, item);

    return item.payload;
  }

  // TODO: LRU consistency when setting existent key
  set(key, item) {
    if (!Buffer.isBuffer(item)) {
      throw new Error('Given value is not a Buffer');
    }

    const bufferSize = Buffer.byteLength(item);

    if (bufferSize > this.#maxSize) {
      throw new Error('Item size is greated than the max size');
    }

    let availableSize = this.#maxSize - this.#size;

    while (bufferSize > availableSize) {
      const lruKey = this.#map.keys().next().value;
      const {size} = this.#map.get(lruKey);
      this.#map.delete(lruKey);

      this.#size -= size;
      availableSize += size;
    }

    this.#map.set(key, {size: bufferSize, payload: item});
    this.#size += bufferSize;

    return this;
  }
}

export {LRUCache};

