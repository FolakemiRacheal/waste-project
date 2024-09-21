const { pickUpWasteTemplate } = require("../helpers/HTML");
const userModel = require("../model/user");
const { sendMail } = require("../helpers/sendMail");
const wasteModel = require("../model/wasteRequest");
require("dotenv").config();

exports.createWaste = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //const oldRequest = await wasteModel.find({ userId: id });

    const createWaste = new wasteModel(req.body);
    createWaste.Name = user.Name;
    createWaste.Email = user.Email;

    if (createWaste.WasteKG < 10) {
      return res.status(400).json({
        message: "Waste must be at least 10 kg",
      });
    }
  
    createWaste.userId.push(id);
    await createWaste.save();

    user.wasteDetail = createWaste;
    await user.save();

    await sendMail({
      subject: "Waste Recycling Confirmation Email",
      email: createWaste.Email,
      html: pickUpWasteTemplate(createWaste),
    });

    createWaste.userId = [id];
    const currentNigerianTime = new Date(new Date().getTime() + (1 * 60 * 60 * 1000));
    createWaste.createdAt = currentNigerianTime;
    await createWaste.save();
    res.status(201).json({
      message: "Waste entry created successfully",
      data: createWaste
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllWaste = async (req, res) => {
  try {
    const getAllWaste = await wasteModel.find();
    if (getAllWaste.length === 0) {
      res.status(200).json({
        message: "list of all to do in the database",
        data: getAllWaste,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message,
    });
  }
};

// exports.getUserWasteRecords = async (req, res) => {
//   try {
//     const id = req.user.userId;
//     const wasteRecords = await wasteModel.find({ userId: id});

//     res.status(200).json({
//       message: "Retrieved waste records successfully",
//       data: wasteRecords,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.getUserWasteRecords = async (req, res) => {
  try {
    // Retrieve the user ID from the request (assuming user is authenticated)
    const userId = req.user.userId;

    // Validate that the user ID is present
    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing",
      });
    }

    // Fetch all waste records for the given user ID
    const wasteRecords = await wasteModel.find({ userId });

    // Check if any records were found
    if (wasteRecords.length === 0) {
      return res.status(404).json({
        message: "No waste records found for this user",
      });
    }

    // Respond with the retrieved waste records
    res.status(200).json({
      message: "Retrieved waste records successfully",
      data: wasteRecords,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving waste records",
      error: error.message,
    });
  }
};


//DELETE
exports.deleteWaste = async (req, res) => {
  try {
    const Id = req.params.id;
    const deleteWaste = await wasteModel.findByIdAndDelete(Id);
    if (!deleteWaste) {
      res.status(404).json({
        message: `Waste  with ID: ${Id} not found`,
        data: deleteWaste,
      });
    }
    res.status(200).json({
      message: `waste with the ID ${Id} deleted successfully`,
      data: deleteWaste,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//UPDATE
exports.updateWaste = async (req, res) => {
  try {
    const Id = req.params.id;
    const updateWaste = await wasteModel.findByIdAndUpdate(Id, req.body, {
      new: true,
    });
    if (!updateWaste) {
      res.status(404).json({
        message: `updateWaste with ID: ${Id} update successfully`,
        data: updateWaste,
      });
    } else {
      res.status(200).json({
        message: `list found`,
        data: updateWaste,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.wasteHistory = async (req, res) => {
  try {
    const { userId } = req.user;
    const wasteHistory = await wasteModel
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("userId");

    //count the number of pending request
    const pendingRequest = wasteHistory.filter(
      (waste) => waste.status === "pending"
    ).length;
    console.log("Pending Request: " + pendingRequest);

    // Sum all the wasteKG
    const totalWaste = wasteHistory.reduce(
      (acc, waste) => acc + (waste.WasteKG || 0),
      0
    );
    // Sum the wasteKG values
    console.log(" totalWaste: " + totalWaste);

    return res.status(200).json({
      message: "waste history found successfully",
      data: wasteHistory,
      pendingRequest: pendingRequest,
      //totalApprovedWaste: totalApprovedWaste,
      totalWaste: totalWaste,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error" + error.message,
    });
  }
};

exports.pickWaste = async (req, res) => {
  try {
    const { wasteId } = req.params;
    const wasteRequest = await wasteModel.findById(wasteId);
    if (!wasteRequest) {
      return res.status(404).json({
        message: `Waste request with id: ${wasteId} does not exist`,
      });
    }

    if (wasteRequest.status == "approved") {
      return res.status(403).json({
        message: `Waste request with id: ${wasteId} is already approved`,
      });
    }

    wasteRequest.status = "approved";
    await wasteRequest.save();
    return res.status(200).json({
      message: "Waste pick successfully",
      data: wasteRequest
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error" + error.message,
    });
  }
};
