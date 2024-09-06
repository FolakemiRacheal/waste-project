const mongoose = require('mongoose')

const wasteSchema = new mongoose.Schema({
    // user:{
    //     type:String,
    //     required:true
    // },
    name:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:String,
        required:true,
        unique:true
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
    user:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],
    
    blackList:[]
},{timestamps:true})

const wasteModel = mongoose.model ("waste",wasteSchema)
module.exports = wasteModel