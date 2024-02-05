import { Transform } from 'stream';
import { cliCommands } from '../utils/consts/cli-commands.js';
import { changeDirectory, navigationUp, redirectToInitDir, writeCurrentFolderList } from './navigation.module.js';
import { osModule } from './os.module.js';
import { appEndListener } from './app-end-listener.js';
import { parseArgs } from './parse-args.js';
import { calculateHash } from './hash.module.js';
import { compressDecompressFile } from './zip.module.js';

const app = async () => {
    const username = parseArgs()?.['username'] || 'unknown';

    const workingStream = new Transform({
        transform(input, encoding, callback) {
            callback(null, input);
        },
    });

    process.stdin.on('data', (chunk) => {
        const input = chunk.toString().trim();

        if (input === '.exit') {
            workingStream.end();
        } else {
            workingStream.write(input);
        }
    });

    workingStream.on('data', (chunk) => {
        const inputsArray = chunk.toString().trim().split(' ');

        switch (inputsArray[0]) {
            case cliCommands.up:
                navigationUp();
                break;
            case cliCommands.cd:
                changeDirectory(inputsArray[1]);
                break;
            case cliCommands.ls:
                writeCurrentFolderList();
                break;

            case cliCommands.cat:
                process.stdout.write('READ BY CAT');
                break;
            case cliCommands.add:
                process.stdout.write('ADDDD');
                break;

            case cliCommands.os:
                osModule(inputsArray[1]);
                break;

            case cliCommands.hash:
                calculateHash(inputsArray[1]);
                break;

            case cliCommands.compress:
                compressDecompressFile(inputsArray[1], inputsArray[2], true);
                break;
            case cliCommands.decompress:
                compressDecompressFile(inputsArray[1], inputsArray[2], false);
                break;

            default:
                process.stdout.write('UNKNOWN COMMAND, try again.');
        }

        process.stdout.write('\n');
        process.stdout.write(`You are currently in ${process.cwd()} \n`);
    });

    process.stdout.write(`Welcome to the File Manager, ${username}! \n`);

    redirectToInitDir();

    process.stdout.write('\n');

    process.stdout.on('error', (err) => {
        console.log(err);
    });

    // await pipeline(process.stdin, workingStream, process.stdout)

    appEndListener(workingStream, username);
};

export {
    app,
};
