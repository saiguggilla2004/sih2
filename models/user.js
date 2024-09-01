const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true
    },
    industry: String,
    location: String,
    profilePicture: String, // Store the path to the image
    bio: String, // Short biography or description
    dateJoined: {
        type: Date,
        default: Date.now
    },
    posts:[
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }
    ],
    stories:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'SuccessStory'
    }]
    ,
    jobs:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Job'
    }]

});


userSchema.plugin(passportLocalMongoose)
const User=mongoose.model("User",userSchema);

module.exports=User;