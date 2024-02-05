import { createReadStream } from 'fs';
import { access, cp, rename, rm, writeFile } from 'fs/promises';
import { mkdir } from 'node:fs/promises';
import path from 'path';

// For testing purposes (use it step by step):

// cat file-to-read.txt
// add new-empty-file.txt
// rn new-empty-file.txt more-new-empty.txt
// cp more-new-empty.txt dir/copied.file.cp
// mv dir/copied.file.cp moved.file.mv
// rm more-new-empty.txt

const readAndPrint = async (filePath) => {
    try {
        await access(filePath);

        const readStream = createReadStream(filePath);

        readStream.on('data', (data) => {
            process.stdout.write(data);
        });
    } catch {
        console.error('Reading failed. Please try again.');
    }
};

const createFile = async (filePath) => {
    try {
        await writeFile(filePath, '');
        console.log('Operation completed');
    } catch {
        console.error('Creating failed. Please try again.');
    }
};

const renameFile = async (filePath, newFilePath) => {
    try {
        await rename(filePath, newFilePath);
        console.log('Operation completed');
    } catch {
        console.error('Renaming failed. Please try again.');
    }
};

const copyFile = async (filePath, newFilePath) => {
    try {
        await mkdir(path.dirname(newFilePath));
        await cp(filePath, newFilePath, { recursive: true });
        console.log('Operation completed');
    } catch {
        console.error('Copying failed. Please try again.');
    }
};

const moveFile = async (currentFilePath, newFilePath) => {
    try {
        await rename(currentFilePath, newFilePath); // better way
        console.log('Operation completed');
    } catch {
        console.error('Moving failed. Please try again.');
    }
};

const deleteFile = async (filePath) => {
    try {
        await rm(filePath);
        console.log('Operation completed');
    } catch {
        console.error('Deleting failed. Please try again.');
    }
};

export {
    readAndPrint,
    createFile,
    renameFile,
    copyFile,
    moveFile,
    deleteFile,
};
