import path from 'path';
import { getHomeDir } from './os.module.js';
import { readdir } from 'node:fs/promises';

const redirectToInitDir = () => {
    try {
        process.chdir(getHomeDir());

        // changeDirectory('projects/BACKENDS/RSnode/rs-file-manager-cli/src/files-for-tests'); // for debugging

        process.stdout.write(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.log('chdir error: ' + err);
    }
};

const navigationUp = () => {
    try {
        const parentPath = path.dirname(process.cwd());
        process.chdir(parentPath);
        console.log(parentPath);
    } catch {
        console.log('Operation failed. Please try again.');
    }
};

const writeCurrentFolderList = async () => {
    try {
        const list = await readdir(process.cwd());

        const tableList = list.reduce((result, liName) => {
            const type = pathType(liName);
            result[type].push({ Name: liName, Type: type });

            return result;
        }, { file: [], directory: [] });

        console.table([
            ...tableList.directory.sort((a, b) => a.Name.localeCompare(b.Name)),
            ...tableList.file.sort((a, b) => a.Name.localeCompare(b.Name)),
        ]);
    } catch {
        console.log('Operation failed. Please try again.');
    }
};

const changeDirectory = (newPath) => {
    try {
        if (path.isAbsolute(newPath)) {
            process.chdir(newPath);
        } else {
            process.chdir(path.join(process.cwd(), newPath));
        }
    } catch {
        console.log('The directory Not Found!');
    }
};

const pathType = (fileName) => {
    return fileName.includes('.') ? 'file' : 'directory';
};

export {
    navigationUp,
    redirectToInitDir,
    writeCurrentFolderList,
    changeDirectory,
};
