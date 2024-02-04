import { parseArgs } from './app/parse-args.js';
import { appEndListener } from './app/app-end-listener.js';
import { Transform } from 'stream';
import { cliCommands } from './utils/consts/cli-commands.js';
import { getHomeDir, osModule } from './app/os.module.js';
import { changeDirectory, navigationUp, redirectToInitDir, writeCurrentFolderList } from './app/navigation.module.js';

let username = '';

username = parseArgs()?.['username'] || 'unknown';

const start = async () => {
    // const workingStream = createWriteStream(path);
    // const rs = createReadStream();

    console.log('Starting directory: ' + process.cwd());
    console.log('Home directory: ' + getHomeDir());

    try {
        const workingStream = new Transform({
            transform(input, encoding, callback) {
                callback(null, input);
            },
        });

        // const workingStream = new Transform({
        //     transform(input, encoding, (null, input) => {
        //     console.log(input);
        //     // console.log(string);
        //
        //     return input.toString();
        //     })
        // });

        // const workingStream = new Duplex({
        //     read(size) {
        //         console.log(size);
        //     },
        //     write(chunk, encoding, callback) {
        //         callback(null, (string) => {
        //             console.log(chunk);
        //             console.log(encoding);
        //             console.log(string);
        //         });
        //     },
        // });
        //
        // workingStream.on('data', (data) => {
        //     process.stdout.write(data);
        // });

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

                default:
                    process.stdout.write('UNKNOWN COMMAND');
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
    } catch {
        console.log('Operation failed. Please try again.!')
    }
};

await start();

