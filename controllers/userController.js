const User = require("../model/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register a user
exports.registerUser = async (req, res) => {
  try {
    //collect all information
    const { firstname, lastname, email, password } = req.body;

    //validate the data, if exists
    if (!(email && password && firstname && lastname)) {
      res.status(401).send("All fields are required");
    }

    // check if user exists or not

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already found in database");
    }

    // encrypt the password
    const myEncyPassword = await bcrypt.hash(password, 10);

    //create a new entry in database
    const user = await User.create({
      // firstname: firstname,
      firstname,
      lastname,
      email,
      password: myEncyPassword,
    });

    // create a token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
      },
      "shhhh",
      { expiresIn: "2h" }
    );

    user.token = token;
    // don't want to send the password
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

// login a user
exports.loginUser = async (req, res) => {
  try {
    //collect information from frontend
    const { email, password } = req.body;

    //validate
    if (!(email && password)) {
      res.status(401).send("email and password required");
    }

    //check user exists in DB
    const user = await User.findOne({ email });

    //if user does not exits - assignment

    //match the password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, "shhhh", {
        expiresIn: "2h",
      });

      user.password = undefined;
      user.token = token;

      //create token and send
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }

    res.sendStatus(400).send("email or password is incorrect");
  } catch (error) {
    console.log(error.message);
  }
};
