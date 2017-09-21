// handle HTTP route GET / and POST / i.e. Home
function homeRoute (request, response) {
  if(request.url === "/") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(
      `<h1>Welcome To Comic Collection!</h1>
       <h2>Coming Soon</h2>`
    );
  }
}