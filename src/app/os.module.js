import os from 'os';
import { osCommandArgs } from '../utils/consts/os-command-args.js';

export const osModule = (arg) => {
    process.stdout.write('\n');

    switch (arg) {
        case osCommandArgs.eol:
            console.log(`Default system End-Of-Line: ${os.endianness()}`);
            break;
        case osCommandArgs.cpus:
            console.log(`Host machine CPUs info: \n amount: ${os.availableParallelism()}; model: ${os.cpus()[0].model };`);
            console.log(os.cpus().map((data) => ({ model: data.model, speed: data.speed })));
            break;
        case osCommandArgs.homedir:
            console.log(`Home directory: ${getHomeDir()}`);
            break;
        case '-u':
        case osCommandArgs.username:
            console.log(`Current system user name: ${os.userInfo()?.username}`);
            break;
        case osCommandArgs.architecture:
            console.log(`CPU architecture: ${os.arch()}`);
            break;
        default:
            process.stdout.write('Unknown --arg in OS operation');
    }
};

export const getHomeDir = () => {
    return os.homedir();
}

