const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      lowercase: true,
      // unique:true
    },
    PhoneNumber: {
      type: String,
      required: true,
      // unique:true
    },
    Password: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // wasteDetail: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //   ref: "wastes",
    //   },
    // ],
    blackList: [],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
