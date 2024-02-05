import { app } from './app/app.js';

const start = async () => {
    try {
        await app();
    } catch {
        console.error('Operation failed. Please try again! G');
    }
};

await start();
