// handle HTTP route GET / and POST / i.e. Home
function home (request, response) {
  if(request.url === "/") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(
      `<h1>Welcome To Comic Collection!</h1>
       <h2>Coming Soon</h2>`
    );
  }
}

//Handle HTTP route GET /:comicQuery i.e. /hulk
function comicQuery(request, response) {
  const subject = request.url.replace("/", "");
  if(subject.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(
      `<h1>Welcome To Comic Collection!</h1>
       <h2>A database for ${subject} comic collections</h2>
       <h3>Coming Soon</h3>`
    );
    
  }
}

module.exports.home = home;
module.exports.comicQuery = comicQuery;