const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:{type:String,required:true},
    img:{type:String,default:"https://samples-files.com/wp-content/uploads/2023/05/sample-tiff-file-serp.webp"},
    content:{type:String,required:true},
    postedAt:{type:Date,default:Date.now}
});

const Post=mongoose.model("Post",postSchema);
module.exports=Post;