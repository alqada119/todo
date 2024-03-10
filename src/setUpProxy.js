const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:http://ec2-18-221-128-94.us-east-2.compute.amazonaws.com',
      changeOrigin: true,
    })
  );
};