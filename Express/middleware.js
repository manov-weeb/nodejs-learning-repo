const express = require("express");
const app = express();

const logger = require("./logger");
const authorize = require("./authorize");

app.use("/api", [logger, authorize]);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("Aboutpage");
});

app.get("/api", (req, res) => {
  res.send("Got the API");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
