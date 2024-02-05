import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import * as fsPromises from 'node:fs/promises';

const hashAlgorithm = 'sha256';
// hash file-for-hash.txt // for testing

const calculateHash = async (filePath) => {
    try {
        await fsPromises.access(filePath);

        const hash = createHash(hashAlgorithm);
        const stream = createReadStream(filePath);

        stream.pipe(hash).on('finish', () => {
            console.log(`For the file, hash with algorithm '${hashAlgorithm}': ${hash.digest('hex')}.`);
        });
    } catch {
        console.log('Operation failed. Please try again.');
    }
};

export {
    calculateHash,
};
