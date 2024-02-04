import { createWriteStream } from 'fs';
import { getNecessaryPathInCurrentDir } from './utils/helpers/path.helper.js';
import { parseArgs } from './app/parse-args.js';
import { appEndListener } from './app/app-end-listener.js';

const path = getNecessaryPathInCurrentDir(import.meta.url, 'file-to-write.txt');
let username = '';

username = parseArgs()?.['username'] || 'unknown';

const start = async () => {
    const ws = createWriteStream(path);

    process.stdout.write(`Welcome to the File Manager, ${username}!`);
    process.stdout.write('\n');

    process.stdin.on('data', (chunk) => {
        const input = chunk.toString();

        if (input.trim() === '.exit') {
            ws.end();
        } else {
            ws.write(input);
        }
    });

    appEndListener(ws, username);
};

await start();

