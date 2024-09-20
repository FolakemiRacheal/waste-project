const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requestKG: {
      type: Number,
      required: true,
    },
    phone: {
        type: Number,
        required: true,
      },
    pickUpAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    userId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],

    //blackList:[]
  },
  { timestamps: true }
);

const requestModel = mongoose.model("request", requestSchema);
module.exports = requestModel;
