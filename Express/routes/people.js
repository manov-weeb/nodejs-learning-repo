const express = require("express");
const router = express.Router();


const {
  deleteAccount,
  createAccount,
  updateAccount,
  getPeople,
} = require("../controllers/people");

// router.get("/", getPeople);

// router.post("/", createAccount);

// router.put("/:id", updateAccount);

// router.delete("/:id", deleteAccount);

router
  .route("/")
  .get(getPeople)
  .post(createAccount)
  .put(updateAccount)
  .delete(deleteAccount);

module.exports = router;
