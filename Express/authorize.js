const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "manov") {
    req.user = { name: "manov", id: 1052 };
  } else {
    res.status(401).send("Unauthorized");
  }
  next();
};

module.exports = authorize;
