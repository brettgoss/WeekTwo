const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) =>{
  console.log("Path:", req.url, "Method:", req.method);
  var message;
  if (req.url === '/'){
    res.statusCode = 200;
    message = "Welcome to my localhost!";
  } else if (req.url === '/about') {
    res.statusCode = 200;
    message = "About Me!";
  } else {
    res.statusCode = 404;
    message = "File Not Found";
  }
  res.setHeader('Content-Type', 'text/plain');
  res.end(message + '\n');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
