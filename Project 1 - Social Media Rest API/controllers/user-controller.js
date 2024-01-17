const User = require("../models/User");
const bcrypt = require("bcrypt");

const { handleErrors } = require("./utils");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return handleErrors(res, 404, "No users found.");
    }

    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return handleErrors(res, 400, "Please provide all required fields.");
  }

  const MIN_PASSWORD_LENGTH = 8;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return handleErrors(
      res,
      400,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    );
  }

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return handleErrors(res, 400, "User Already Exists! Login Instead?");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });

    await newUser.save();

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return handleErrors(res, 400, "Please provide both email and password.");
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      return handleErrors(res, 404, "Wrong credentials");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return handleErrors(res, 404, "Wrong credentials");
    }

    return res.status(200).json({
      success: true,
      message: `Login Successful, Hello ${existingUser.name}`,
    });
  } catch (error) {
    console.error(error);
    return handleErrors(res, 500, "Internal Server Error");
  }
};

module.exports = { logIn, signUp, getAllUsers };
