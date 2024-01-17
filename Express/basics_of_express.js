const express = require("express");
const app = express();

const path = require("path");

//setup static and middleware
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(200).status(404).send("Page Not Found");
});

app.listen(5000, () => {
  console.log("object");
});
