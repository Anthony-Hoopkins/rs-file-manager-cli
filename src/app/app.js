import { Transform } from 'stream';
import { cliCommands } from '../utils/consts/cli-commands.js';
import { changeDirectory, navigationUp, redirectToInitDir, writeCurrentFolderList } from './navigation.module.js';
import { osModule } from './os.module.js';
import { appEndListener } from './app-end-listener.js';
import { parseArgs } from './parse.module.js';
import { calculateHash } from './hash.module.js';
import { compressDecompressFile } from './zip.module.js';
import { copyFile, createFile, deleteFile, moveFile, readAndPrint, renameFile } from './file.module.js';
import { getFullPath } from '../utils/helpers/path.helper.js';

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

    await workingStream.on('data', (chunk) => {
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
                readAndPrint(getFullPath(inputsArray[1]));
                break;
            case cliCommands.add:
                createFile(getFullPath(inputsArray[1]));
                break;
            case cliCommands.rn:
                renameFile(getFullPath(inputsArray[1]), getFullPath(inputsArray[2]));
                break;
            case cliCommands.cp:
                copyFile(getFullPath(inputsArray[1]), getFullPath(inputsArray[2]));
                break;
            case cliCommands.mv:
                moveFile(getFullPath(inputsArray[1]), getFullPath(inputsArray[2]));
                break;
            case cliCommands.rm:
                deleteFile(getFullPath(inputsArray[1]));
                break;

            case cliCommands.os:
                osModule(inputsArray[1]);
                break;

            case cliCommands.hash:
                calculateHash(getFullPath(inputsArray[1]));
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

        setTimeout(() => {
            process.stdout.write('\n');
            process.stdout.write(`You are currently in ${process.cwd()} \n`);
        }, 150);
    });

    process.stdout.write(`Welcome to the File Manager, ${username}! \n`);

    redirectToInitDir();

    process.stdout.write('\n');

    process.stdout.on('error', (err) => {
        console.log(err);
    });

    appEndListener(workingStream, username);
};

export {
    app,
};
