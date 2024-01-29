const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/db");
const app = express();

require("dotenv").config();

connectDb();

app.use(express.json());
app.use(errorHandler);
app.use("/api/v1/contacts", require("./routes/contacts-routes"));
app.use("/api/v1/users", require("./routes/user-routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
