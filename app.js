const router = require('./router');

// create webserver
const http = require('http');
http.createServer(function (request, response) {
  router.home(request, response);
  router.comicQuery(request, response);
}).listen(3000);
console.log('Server running at http://<your url>:3000');
