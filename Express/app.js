const express = require("express");
const app = express();

const people = require("./routes/people");
const register = require("./routes/auth");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/api/people/", people);
app.use("/auth/", register);

app.listen(5000, () => {
  console.log("Listening at port 5000");
});
