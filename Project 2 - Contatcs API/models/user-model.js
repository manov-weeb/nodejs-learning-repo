const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
     
    username: { type: String, required: [true, "Please add the user name"] },
    email: {
      type: String,
      required: [true, "Please add the user email"],
      unqiue: [
        true,
        "User with the email already exists. Try Logging in instead?",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema)