import fs from 'node:fs';
import readline from 'node:readline';
import undici from 'undici';
import {Logger} from './logger.js';
import {Fetcher} from './fetcher.js';
import {CachedFetcher} from './cached-fetcher.js';

const urls = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

const logger = new Logger(fs.createWriteStream('output.txt'))
const fetcher = new CachedFetcher(new Fetcher(undici.fetch, logger), logger);

for await (const url of urls) {
  await fetcher.fetch(url);
}

await logger.close();

