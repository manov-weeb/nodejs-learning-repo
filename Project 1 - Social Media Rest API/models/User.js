const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, requried: true },
  email: { type: String, requried: true, unqiue: true },
  password: { type: String, required: true, minlength: 8 },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});

module.exports = mongoose.model("User", userSchema);
