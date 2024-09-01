const mongoose = require("mongoose")

const jobSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:{type:String,required:true},
    description:{type:String,required:true},
    postedAt:{type:Date,default:Date.now},
    location:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
        default:"https://www.youtube.com/"
    }
});

const Job = mongoose.model('Job',jobSchema)

module.exports = Job;