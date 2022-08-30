import {promisify} from 'node:util';

const EOL = '\n';

class Logger {
  #stream;

  constructor(stream) {
    this.#stream = stream;
  }

  log(msg) {
    return promisify(this.#stream.write).bind(this.#stream)(msg + EOL);
  }

  close() {
    return promisify(this.#stream.close).bind(this.#stream)();
  }
}

export {Logger};

