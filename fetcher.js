class Fetcher {
  #fetch;
  #logger;

  constructor(fetch, logger) {
    this.#fetch = fetch;
    this.#logger = logger;
  }

  async fetch(url) {
    const response = await this.#fetch(url);
    const item = await this.#toBuffer(response.body);
    this.#logger.log(`DOWLOADED, bytes: ${Buffer.byteLength(item)}`);

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
