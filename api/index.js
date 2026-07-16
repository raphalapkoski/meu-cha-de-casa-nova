const path = require('path');

const distBackend = path.resolve(__dirname, '..', 'dist', 'backend', 'main.js');
const { bootstrap } = require(distBackend);

let cachedApp;

module.exports = async (req, res) => {
  if (!cachedApp) {
    cachedApp = await bootstrap();
    await cachedApp.init();
  }
  const instance = cachedApp.getHttpAdapter().getInstance();
  return new Promise((resolve) => {
    res.on('finish', resolve);
    instance(req, res);
  });
};
