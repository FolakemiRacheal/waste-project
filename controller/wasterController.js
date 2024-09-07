
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
    
    if (!createWaste || createWaste.wasteKg === undefined) {
      return res.status(400).json({
         message: 'Missing required fields' });
    }
    
    if (createWaste.wasteKg < 10) {
      return res.status(400).json({
         message: 'Waste must be at least 10 kg' });
    }

    await createWaste.save();
    
    // Update user details
    //user.userDetail.push(createWaste);
    
    await sendMail({
      subject: 'Waste Recycling Confirmation Email',
      email: user.Email,
      html: pickUpWasteTemplate(user.fullName)
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



  //place an order for your waste to be recycle
  exports.pickWaste = async(req,res)=>{
    app.post('/order', async (req, res) => {
      const { email, name, address, weight } = req.body;
    
      // Validate input
      if (!email || !name || !address || weight === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
    
      // Validate weight
      if (weight < 40) {
        return res.status(400).json({ message: 'Waste must be at least 40 kg' });
      }
    
      // Compose email message
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Waste Recycling Order Confirmation',
        text: `Dear ${name},\n\nThank you for placing an order with us. Your request has been confirmed and will be available for pickup in the next three working days.\n\nBest regards,\nThe Waste Recycling Team`
      };
    
      try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Order placed successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      }
    });
    
  }
  