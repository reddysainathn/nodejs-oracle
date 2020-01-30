const webServer = require('./services/web-server.js')

async function startUp() {
    console.log('Starting Application');

    try {
        console.log('Initializing Web Server Module');
        await webServer.initialize();
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
}

startUp();