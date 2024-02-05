export const appEndListener = (workingStream, username = 'User') => {
    const message = `Thank you for using the File Manager, ${username}, goodbye!`;

    workingStream.on('finish', () => {
        appStop(username);
    });

    process.on('SIGINT', () => {
        appStop(username);
    });

    const appStop = () => {
        process.stdout.write('\n');
        process.stdout.write(message);
        process.exit();
    };
};

