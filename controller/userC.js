const userModel = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../helpers/sendMail");
const {
  signUpTemplate,
  verifyTemplate,
  forgotPasswordTemplate,
} = require("../helpers/HTML");
const fs = require("fs");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    const { Name, Email, Password, PhoneNumber, Location } = req.body;
    if (!Name || !Email || !Location || !Password || !PhoneNumber) {
      return res.status(400).json({
        message: `Please enter all details`,
      });
    }
    const existingUser = await userModel.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({
        message: `User with email already exist`,
      });
    }
    const saltedPassword = await bcryptjs.genSaltSync(12);
    const hashedPassword = await bcryptjs.hashSync(Password, saltedPassword);

    const user = new userModel({
      Name: Name.trim(),
      Email: Email.toLowerCase().trim(),
      Location: Location.trim(),
      Password: hashedPassword,
      PhoneNumber: PhoneNumber.trim(),
    });
    const Token = jwt.sign(
      {
        id: user._id,
        Email: user.Email,
      },
      process.env.JWT_SECRET || finalProject,
      { expiresIn: "60 minutes" }
    );
    const verifyLink = `https://recyclepay.vercel.app/#/SignupConfirmation/${Token}`;

    await user.save();
    await sendMail({
      subject: `Verification email`,
      email: user.Email,
      html: signUpTemplate(verifyLink, user.Name),
    });
    res.status(200).json({
      message: `User created successfully`,
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];

      return res.status(400).json({
        error: `This ${duplicateField} has already been used, Please use another one.`,
      });
    }
    res.status(500).json("internal server error " + error.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({
        message: `Please enter all details`,
      });
    }
    const checkMail = await userModel.findOne({ Email: Email.toLowerCase() });
    if (!checkMail) {
      return res.status(400).json({
        message: `User with email not found`,
      });
    }

    const confirmPassword = await bcryptjs.compare(
      Password,
      checkMail.Password
    );
    if (!confirmPassword) {
      return res.status(400).json({
        message: `Incorrect password`,
      });
    }

    if (!checkMail.isVerified) {
      return res.status(400).json({
        message: `User not verified,Please check your mail to verify your account`,
      });
    }
    const Token = await jwt.sign(
      {
        userId: checkMail._id,
        Email: checkMail.Email,
        isAdmin: checkMail.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "24hrs" }
    );

    res.status(200).json({
      message: `Login succssfully`,
      data: checkMail,
      Token,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json(`User with ID ${id} was not found`);
    }

    user.isAdmin = true;
    await user.save();
    res.status(200).json({
      message: `Dear ${user.Name}, you're now an admin`,
      data: user,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    // Extract the token from the request params
    const { token } = req.params;
    // Extract the email from the verified token
    const { Email } = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user with the extracted email
    const user = await userModel.findOne({ Email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the user has already been verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    // Verify the user
    user.isVerified = true;
    // Save the user data
    await user.save();

    // Send a success response
    return res.status(200).json({
      message: "User verified successfully",
    });
  } catch (err) {
    // Handle JWT expiration or verification errors
    if (err instanceof jwt.JsonWebTokenError) {
      return res.json({ message: "Link expired,request for another link." });
    }

    // Handle other errors
    return res.status(500).json({ message: err.message });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  try {
    const { Email } = req.body;
    // Find the user with the email
    const user = await userModel.findOne({ Email });
    // Check if the user is still in the database
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Check if the user has already been verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    const Token = jwt.sign(
      {
        Email: user.Email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20mins" }
    );
    const verifyLink = `http://localhost:2601/api/v1/user/verify/${Token}`;

    let mailOptions = {
      email: user.Email,
      subject: "Verification email",
      html: verifyTemplate(verifyLink, user.Name),
    };
    // Send the the email
    await sendMail(mailOptions);
    // Send a success message
    res.status(200).json({
      message: "Verification email resent successfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.ForgetPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    // Find the user with the email
    const user = await userModel.findOne({ Email });
    // Check if the user is still in the database
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const ResetToken = jwt.sign(
      {
        Email: user.Email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20mins" }
    );

    const resetLink = `https://recyclepay.vercel.app/#/ResetPassword/${ResetToken}`;
    const mailOptions = {
      email: user.Email,
      subject: "Reset password",
      html: forgotPasswordTemplate(resetLink, user.Name),
    };

    await sendMail(mailOptions);

    res.status(200).json({
      message: `Email for reset password sent successfully`,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    // Get the token from params
    const { token } = req.params; // Correct destructuring of 'token'
    const { Password } = req.body;

    // Verify the token and extract email
    const { Email } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the email
    const user = await userModel.findOne({ Email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate salt and hash the new password
    const saltedeRounds = await bcryptjs.genSalt(12); // Fixed typo: changed 'saltedeRounds' to 'saltRounds'
    const hashedPassword = await bcryptjs.hash(Password, saltedeRounds);

    // Set the new password and save the user
    user.Password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (err) {
    // Handle JWT expiration or verification errors
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(400)
        .json({
          message: "Token has expired, please request another reset link",
        });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { token } = req.params; // Destructure 'token' from req.params
    const { NewPassword, OldPassword } = req.body;

    // Verify token and extract email
    const { Email } = jwt.verify(token, process.env.JWT_SECRET);

    // Check for user by email
    const user = await userModel.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare old password with user's current password
    const verifyPassword = await bcryptjs.compare(OldPassword, user.Password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Old password does not match" });
    }

    // Hash the new password
    const saltedeRounds = await bcryptjs.genSalt(12); // Fix variable name typo
    const hashedPassword = await bcryptjs.hash(NewPassword, saltedeRounds);
    user.Password = hashedPassword;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the user's ID is passed as a URL parameter
    const { Name, Email, Password, PhoneNumber, Location } = req.body;

    if (!id) {
      return res.status(400).json(`User ID is required.`);
    }

    // Find the user by ID
    const user = await userModel.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).json(`User not found.`);
    }

    // Update the user's details
    user.Name = Name || user.Name;
    user.Password = Password || user.Password;
    user.Email = Email || user.Email;
    user.PhoneNumber = PhoneNumber || user.PhoneNumber;
    user.Location = Location || user.Location;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "User updated successfully.",
      data: user,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const all = await userModel.find();
    res.status(200).json({
      message: `kindly find below all ${all.length}`,
      data: all,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.oneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json(`User not found.`);
    }
    res.status(200).json({
      message: `Dear ${user.Name}, kindly find your information below:`,
      data: user,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.logOut = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "invalid token",
      });
    }
    // Verify the user's token and extract the user's email from the token
    const { email } = jwt.verify(token, process.env.jwt_secret);
    // Find the user by ID
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.blackList.push(token);
    // Save the changes to the database
    await user.save();
    //   Send a success response
    res.status(200).json({
      message: "User logged out successfully.",
    });
  } catch (error) {
    res.status(500).json(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `User not found`,
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({
      message: `User deleted successfully`,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
