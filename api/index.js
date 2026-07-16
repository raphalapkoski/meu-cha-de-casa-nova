const path = require('path');

const distBackend = path.resolve(__dirname, '..', 'dist', 'backend', 'main.js');
const { bootstrap } = require(distBackend);

let cachedApp;

module.exports = async (req, res) => {
  if (!cachedApp) {
    const app = await bootstrap();
    await app.init();
    cachedApp = app;
  }
  const expressInstance = cachedApp.getHttpAdapter().getInstance();
  return expressInstance(req, res);
};
