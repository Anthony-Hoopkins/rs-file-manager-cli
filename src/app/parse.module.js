export const parseArgs = () => {
    const args = process.argv;

    try {
        return args.reduce((result, value) => {
            if (value.startsWith('--') && value.length > 2) {
                const argsArray = value.split('=');
                result[argsArray[0].substring(2)] = argsArray[1];
            }

            return result;
        }, {});
    } catch {
        return {};
    }
};

