const path = require('path');

const express = require('express');
const config = require('./config');
const router = require('./routes');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use('/api', router);

app.set('views', './src/views')
app.set('view engine', 'pug');

// index page route
app.get('/', function (req, res) {
  res.render('index', { title: 'Comic Collection', message: 'Hello Comic Collector!' })
})

// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});