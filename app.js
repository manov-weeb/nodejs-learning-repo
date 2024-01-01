const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") res.end("This is a homepage.");
  if (req.url === '/about') res.end("This will be an about page");

  res.end(
    `<h1> OOPS! </h1> <p> Can't seem to find this page. </p> <a href = '/'> Back to home </a> `
  );
});

server.listen(5000);
