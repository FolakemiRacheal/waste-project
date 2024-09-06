//const todoModel = require("../model/todoModel")

const userModel = require("../model/userM")


exports.createWaste  = async(req, res)=>{
  
  try {
    const id = req.params.id
    const user = await userModel.findById(id);
    const createWaste = new wasteModel(req.body)
    createWaste.user = user
    createWaste.save()
    user.userDetail.push(createWaste)
    res.status(201).json({
      message: 'List created successfully',
      data: createWaste
    })
  
  } catch (error) {
    res.status(500).json({
      message: (error.message)
  })
  }
}



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
  