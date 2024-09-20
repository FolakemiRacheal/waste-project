const mongoose = require('mongoose')

const wasteSchema = new mongoose.Schema({
    // Name:{
    //     type:String,
    //     required:true,
       
    // },
    PhoneNumber:{
        type:String,
        required:true,
        //unique:true
    },
    
    WasteKG:{
        type:Number,
        required:true,
        // unique:true
    },
   pickUpAddress:{
        type:String,
        required:true
    },
    status:{
        type: String,
        enum: ["pending","approved","declined"],
        default:"pending",
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