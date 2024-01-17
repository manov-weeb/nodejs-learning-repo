const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send("Please provide your credentials!");
});

module.exports = router; 