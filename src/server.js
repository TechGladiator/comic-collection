const express = require('express');
const config = require('./config');

const app = express();

// response when testing server
app.use((req, res, next) => {
  res.end("Hello World!");
});

// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});