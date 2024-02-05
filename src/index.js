import { app } from './app/app.js';

const start = async () => {
    try {
        await app();
    } catch {
        console.log('Operation failed. Please try again!')
    }
};

await start();
