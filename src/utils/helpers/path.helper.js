import { fileURLToPath } from 'url';
import path from 'path';

export const getCurrentDirName = (importMetaUrl) => {
    const __filename = fileURLToPath(importMetaUrl);
    return path.dirname(__filename);
};

export const getNecessaryPathInCurrentDir = (importMetaUrl, name) => {
    const __dirname = getCurrentDirName(importMetaUrl);
    return path.join(__dirname, name);
};

export const getFullPath = (fileName) => {
    try {
        return path.join(process.cwd(), fileName);
    } catch {
        console.log('Operation failed. Please try again!');
    }
};
