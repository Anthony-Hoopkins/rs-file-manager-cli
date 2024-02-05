import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import fsPromises from 'node:fs/promises';
import * as zlib from 'zlib';

// for testing purposes:
// compress file-for-compress.txt compressed.zip
// decompress compressed.zip decompress.txt

const compressDecompressFile = async (fileName, destinationName, isCompress) => {
    try {
        const filePath = path.join(process.cwd(), fileName);
        const destinationPath = path.join(process.cwd(), destinationName);

        await fsPromises.access(filePath);

        const readStream = createReadStream(filePath);
        const stream = isCompress ? zlib.createBrotliCompress() : zlib.createBrotliDecompress();
        const writeStream = createWriteStream(destinationPath);

        await pipeline(readStream, stream, writeStream);

        console.log('Operation done.');
    } catch {
        console.log('Compression failed. Please try again.');
    }
};

export {
    compressDecompressFile
}
