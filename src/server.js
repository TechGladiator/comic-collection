const path = require('path');

const express = require('express');
const config = require('./config');

const app = express();
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.set('view engine', 'pug');

// documentation route
app.use('/doc', function(req, res, next) {
  res.end(`Documentation https://techgladiator.github.io/comic-collection`);
});

// response when testing server
app.use((req, res, next) => {
  res.end("Hello World!");
});

// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});