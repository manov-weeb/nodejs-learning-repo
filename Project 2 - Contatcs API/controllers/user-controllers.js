const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory." });
    //     throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already registered, try logging in.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword);

  const newUser = await User.create({
    username,
    password: hashedPassword, 
    email,
  });

  if (newUser) {
    return res.json({
      success: true,
      message: "user registered, successfully",
      user: [{ _id: newUser.id, email: newUser.email }],
    });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "User Request was not completed!" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory." });
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50m" }
    );

    return res.status(200).json({ accessToken });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Credentials!" });
  }
};

const currentUser = async (req, res, next) => {
  return res.json(req.user);
};

module.exports = { registerUser, loginUser, currentUser };
