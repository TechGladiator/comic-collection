// create webserver
const http = require('http');
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(
    `<h1>Welcome To Comic Collection!</h1>
     <h2>Coming Soon</h2>`
  );
}).listen(3000);