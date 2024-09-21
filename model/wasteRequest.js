const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      //unique:true
    },
    WasteKG: {
      type: Number,
      required: true,
      // unique:true
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
    ]
  },
  { timestamps: true }
);

const wasteModel = mongoose.model("waste", wasteSchema);
module.exports = wasteModel;
