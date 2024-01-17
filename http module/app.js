const http = require("http");
const { readFileSync, read } = require("fs");

//get all files
const homePage = readFileSync("./index.html");

const server = http.createServer((req, res) => {
  const url = req.url;

  console.log("user hit the server"); 
  console.log(req.url, req.method);
  if (url == "/" || url === '/home') { 
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about?</h1>");
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
