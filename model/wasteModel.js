const mongoose = require('mongoose')

const wasteSchema = new mongoose.Schema({
    // Name:{
    //     type:String,
    //     required:true,
       
    // },
    // PhoneNumber:{
    //     type:String,
    //     required:true,
    //     //unique:true
    // },
    // Email:{
    //     type:String,
    //     required:true,
        //unique:true
    // },
    WasteKG:{
        type:String,
        required:true,
        // unique:true
    },
   pickUpAddress:{
        type:String,
        required:true
    },
    userId:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"user",
             required:true
        }
    ],
    
    //blackList:[]
},{timestamps:true})

const wasteModel = mongoose.model ("waste",wasteSchema)
module.exports = wasteModel