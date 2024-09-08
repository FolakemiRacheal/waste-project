const mongoose = require('mongoose')

const wasteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    },
    PhoneNumber:{
        type:String,
        required:true,
        //unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    wasteKg:{
        type:String,
        required:true,
        // unique:true
    },
    address:{
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