const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/user-controllers");
const asyncHandler = require("express-async-handler");
const validateToken = require("../middleware/validateTokenHandler");

const userRouter = express.Router();

userRouter.post("/register", asyncHandler(registerUser));
userRouter.post("/login", asyncHandler(loginUser));
userRouter.get("/current",validateToken, asyncHandler(currentUser));

module.exports = userRouter;
