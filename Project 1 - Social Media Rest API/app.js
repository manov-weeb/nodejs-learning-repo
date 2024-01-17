const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(5000, () => {
      console.log("Connected to the database and listeing on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Unable to connect to the database" });
    process.exit(1);
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  });
  