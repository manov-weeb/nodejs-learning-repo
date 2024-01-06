const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request event(running when the port is loaded)");
  res.end("Hello World!");
});

//listen is asynchronous
server.listen(5000, () => {
  console.log("Server is listening at port 5000");
});

console.log("This is a non synchronous code so will run first");
