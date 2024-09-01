const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    
    
    password:{
        type:String,
        required:true
    }

});
adminSchema.plugin(passportLocalMongoose)
const Admin=mongoose.model("Admin",adminSchema);



module.exports=Admin