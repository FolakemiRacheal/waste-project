
const { pickUpWasteTemplate } = require("../helpers/HTML");
const userModel = require("../model/userM")
const {sendMail} = require('../helpers/sendMail')
const wasteModel = require("../model/wasteModel")
require ("dotenv").config() 

exports.createWaste = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(400).json({
         message: 'User is required' });
    }
    
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' });
    }
    
    const createWaste = new wasteModel(req.body);
    //console.log(user)
    
    if (!createWaste || createWaste.WasteKG === undefined) {
      return res.status(400).json({
         message: 'Missing required fields' });
    }
    createWaste.Email = user.Email; 

    if (createWaste.WasteKG < 10) {
      return res.status(400).json({
         message: 'Waste must be at least 10 kg' });
    }
    createWaste.userId.push(id)
    await createWaste.save();

    user.wasteDetail = createWaste;
    await user.save();

    await sendMail({
      subject: 'Waste Recycling Confirmation Email',
      email: createWaste.Email,
      html: pickUpWasteTemplate(user.Name)
    });
    
    
    res.status(201).json({
      message: 'Waste entry created successfully',
      data: createWaste
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: error.message });
  }
};




exports.getAllWaste= async(req, res)=>{
  try {
    const getAllWaste = await userModel.find();
    if (getAllWaste.length=== 0) {
      res.status(200).json({
        message:"list of all to do in the database",
        data: getAllWaste
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message
    });
  }
}

exports.getAll = async (req, res) => {
  try {
      const contents = await userModel.find().populate("user").exec();

      res.status(200).json({
          message: "Contents retrieved successfully",
          totalNumberOfContents: contents.length,
          data: contents
      });

  } catch (error) {
      res.status(500).json({
          message: error.message 
      });
  }
}



//DELETE 

exports.deleteWaste= async(req, res)=>{
  try {
    const Id = req.params.id
    const deleteWaste = await userModel.findByIdAndDelete(Id);
    if (!deleteWaste) {
      res.status(404).json({
        message: `Waste  with ID: ${Id} not found`,
        data: deleteWaste
      })
    }res.status(200).json({
        message: `waste with the ID ${Id} deleted successfully`,
        data: deleteWaste
      })
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}



//UPDATE
exports.updateWaste= async(req, res)=>{
  try {
    const  Id = req.params.id
    const updateWaste = await userModel.findByIdAndUpdate(Id,req.body,{new: true});
    if (!updateWaste) {
      res.status(404).json({
        message: `updateWaste with ID: ${Id} update successfully`,
        data: updateWaste
      })
    }else{
      res.status(200).json({
        message: `list found`,
        data: updateWaste
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    }
  }



exports.wasteHistory = async(req, res)=>{
try {
  const {userId} = req.user
  const wasteHistory = await wasteModel.find({userId:userId}).sort({createdAt:-1}).populate("userId");
  if (wasteHistory.length=== 0) {
    res.status(404).json({
      message:"list of all waste not found"
      
    })
  }
console.log(wasteHistory)
//count the number of pending request 
const pendingRequest = wasteHistory.filter(waste=>
  waste.status === "pending"

).length
console.log("Pending Request: " + pendingRequest)



// })
//console.log("totalApprovedWaste: " + totalApprovedWaste)


// Sum all the wasteKG
const totalWaste = wasteHistory
.reduce((acc, waste) => acc +(waste.WasteKG || 0), 0); 
// Sum the wasteKG values
console.log(" totalWaste: " +  totalWaste)



  return res.status(200).json({
    message:"waste history found successfully",
    data:wasteHistory,
    pendingRequest:pendingRequest,
    //totalApprovedWaste: totalApprovedWaste,
    totalWaste:totalWaste


  })
} catch (error) {
  return res.status(500).json({
    message:"internal server error"+ error.message
  })
}
}