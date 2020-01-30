const webServer = require('./services/web-server.js');
const dbConfig = require('./config/database.js');
const database = require('./services/database.js');

const defaultThreadPoolSize = 4;

process.env.UV_THEREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;


async function startUp() {
    console.log('Starting Application');

    try {
        console.log('Initializing Web Server Module');
        await webServer.initialize();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    try {
        console.log('Initializing database module');

        await database.initialize();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

startUp();

async function shutDown(e) {
    let err = e;

    console.log('Shutting Down!');

    try {
        console.log('Closing Web Server Module');
        await webServer.close();
    } catch (e) {
        console.log('Encountered Error', e);

        err = err || e;
    }

    console.log('Exiting Process');

    if (err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
    shutDown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');
    shutDown();
});

process.on('uncaughtException', err => {
    console.log('Received uncaught exception');
    console.error(err);
    shutDown(err);
});