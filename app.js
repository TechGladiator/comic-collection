// create webserver
const http = require('http');
http.createServer(function (request, response) {
  homeRoute(request, response);
}).listen(3000);
console.log('Server running at http://<your url>:3000');
