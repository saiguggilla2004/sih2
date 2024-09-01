const express=require("express");
const app=express();
const passport=require("passport");
const LocalStratergy=require("passport-local");
const User=require("./models/user.js");
const flash=require("connect-flash");

let adminId="admin";
let password="admin1234";

const cookieParser=require("cookie-parser");
app.use(cookieParser("sai-guggila"));
const session=require("express-session");
app.use(session({secret:"sai-guggila",resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const path=require("path")
const ejsMate=require("ejs-mate")
const mongoose=require("mongoose");
const methodOverride=require("method-override");
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine("ejs",ejsMate)
const Story=require("./models/successStories");
const Post = require("./models/post.js");
const Job = require("./models/job.js")

main()
.then((res)=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})
async function main()
{
  await mongoose.connect("mongodb://127.0.0.1:27017/sih");
}
const port=3000;
app.listen(port,()=>{
    console.log("listening to the port "+port);
})

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentUser=req.user;

  next();
})

app.get("/",async (req,res)=>{
  let posts=await Post.find();
    res.render("home.ejs",{posts})
})



app.get("/demouser",async (req,res)=>{
  let fakeUser=new User({
    email:"saiguggilla@gmail.com",
    username:"saiguggilla22"
  });

  let registeredUser=await User.register(fakeUser,"mypass123");
  console.log(registeredUser);
  res.send(registeredUser);
})


//posts

// app.get("/register",(req,res)=>{
//   let {name="anonymous"}=req.query;
//   req.flash("success","youre registered succesfully");
//   req.session.name=name;
//   res.send(req.session.name);
// })

// app.get("/hello",(req,res)=>{
//   res.send("hello "+req.session.name);
// })

//to get all the posts
app.get("/posts",async (req,res)=>{

    let posts=await Post.find();
    res.render("allposts.ejs",{posts});
  
})

//to view only particular post
app.get("/posts/:id",async(req,res)=>{
   let {id}=req.params;
   
   let post=await Post.findById(id);
   let userId=post.userId;
   let user=await User.findById(userId);
   console.log(res.locals.currentUser);
   res.render("onepost.ejs",{post,user});
})

//create new post
app.get("/users/:id/newpost",async (req,res)=>{
  let {id}=req.params;
  let user=await User.findById(id);
  res.render("newpost.ejs",{user});

})
//to uplad the new post
app.post("/users/:id/newpost",async(req,res)=>{
  let {id}=req.params;
  let {title,img,content}=req.body;
  let newpost=new Post({
     userId:id,
     title:title,
     img:img,
     content:content,
  });
  let savedpost=await newpost.save();
  console.log(savedpost)
  await User.findByIdAndUpdate(
    id,
    { $push: { posts: savedpost._id } },
    { new: true, useFindAndModify: false }
);
res.redirect("/posts")

});

//edit the post
app.get("/users/:id/editpost",async(req,res)=>{
     let {id}=req.params;
     let post=await Post.findById(id);
     res.render("editpost.ejs",{post});

})

app.patch("/users/:id/editpost",async(req,res)=>{
   let {id}=req.params;
   let {title,content,img}=req.body;
   await Post.findByIdAndUpdate(id,{title:title,content:content,img:img});
   res.redirect("/posts");
})


app.delete("/users/:id/deletepost",async(req,res)=>{
  let {id}=req.params;
  let userId=res.locals.currentUser._id.toString();
  console.log(userId);
  let modifieduser=await User.findByIdAndUpdate(userId, {
    $pull: { posts: id }
});
console.log("modified user")
console.log(modifieduser)
console.log(res.locals.currentUser);
   await Post.deleteOne({_id:id});
   res.redirect("/posts");
})







//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//stories

// app.get("/sendcookies",(req,res)=>{
//   res.cookie("name","sai");
//   console.dir(req.cookies)
// })

// app.get("/verify",(req,res)=>{
//   console.log(req.cookies);
//   res.send("verified");
// })

// app.get("/sendsignedcookie",(req,res)=>{
//   res.cookie("name2","answer2",{signed:true});
//   res.send("set the signed cookie"); 
// })

//to get all the stories
app.get("/stories",async (req,res)=>{
  let stories=await Story.find();
  let success=res.locals.success;
  let error=res.locals.error;
  res.render("allstories.ejs",{stories,success,error});
 
})

  //create new stories
  app.get("/stories/new",(req,res)=>{
    
      if(req.isAuthenticated())
      {
        res.render("newstory.ejs");
      }
      else{
        res.redirect("/login");
      }
   
   
 })
  //to view only particular stories
  app.get("/stories/:id",async (req,res)=>{
    let {id}=req.params;
    let userId=res.locals.currentUser._id.toString();
    let user=await User.findById(userId);
    let story=await Story.findById(id);
    console.log(story);
    res.render("onestory.ejs",{story,user});
  })
  
  
  
  //to uplad the new stories
  
  app.post("/stories/new",async(req,res)=>{
    let userId=res.locals.currentUser._id.toString();
    let {title:title,content:content}=req.body;
    let newStory=new Story({
         userId: res.locals.currentUser._id,
        title:title,
        content:content,
        publishedAt:new Date(),
        isFeatured:true
    });

    let savedstory=await newStory.save()
    

    await User.findByIdAndUpdate(
      userId,
      { $push: { stories: savedstory._id } },
      { new: true, useFindAndModify: false }
  );
    res.locals.success=req.flash("success");
    res.locals.failure=req.flash("failure");
      res.redirect("/stories");
  })
  
  //to edit the post
  
  //the form to edit the post
  app.get("/stories/:id/edit",async(req,res)=>{
      let {id}=req.params;
      let story=await Story.findById(id);
      console.log(story);
      res.render("editstory.ejs",{story});

  })
  
  //now post the edited stories into the database
  
  app.patch("/stories/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let {title:title,content:content}=req.body;
    if(req.isAuthenticated())
    {
      let edited=await Story.findByIdAndUpdate(id,{title:title,content:content}, { new: true } );
      console.log(edited);
      res.redirect("/stories");
    }
    else{
      res.redirect("/login");
    } 
});
  
  //dlete the post
  
  app.delete("/stories/:id/delete",async(req,res)=>{
    if(!req.isAuthenticated())
    {
      res.redirect("/login");
    }
    else{
      // let {id}=req.params;
      // console.log(id);
      // let deleted=await Story.findByIdAndDelete(id);
      // console.log(deleted);
      // res.redirect("/stories");
      let {id}=req.params;
      let userId=res.locals.currentUser._id.toString();
    
      let modifieduser=await User.findByIdAndUpdate(userId, {
        $pull: { stories: id }
    });
    await Story.findByIdAndDelete(id);
    console.log(modifieduser);

    }
    
    res.redirect("/stories");
  });
  

//-------------------------------------------------------------------------------------------------------------------------------------------------------

//login logout section


app.get("/signup",(req,res)=>{
  res.render("signup.ejs"); 
})

app.post("/signup",async (req,res)=>{
  console.log(req.body);
  let {username,email,password,graduationYear,fieldOfStudy,industry,location,profilePicture,bio}=req.body;
  const newUser=new User({
    username:username,
    email:email,
    graduationYear:graduationYear,
    fieldOfStudy:fieldOfStudy,
    industry:industry,
    location:location,
    profilePicture:profilePicture,
    bio:bio,
    dateJoined:new Date

  });
 let savedUser=await User.register(newUser,password);
 console.log(savedUser);
 req.login(savedUser,(err)=>{
  if(err)
  {
    console.log(err);
  }
  req.flash("success","user was registered succesfully");
 res.redirect("/");
 })
 
})

app.get("/login",(req,res)=>{
  res.render("login.ejs");
})

app.post("/login",passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),async(req,res)=>{
  //here we need to authenticate the user
  req.flash("success","you have been succesfuly loggedin");
  console.log(req.user)
  res.redirect("/");
})

app.get("/logout",(req,res)=>{
    req.logout((err)=>{
      console.log(err);
    });
    req.flash("success","you have been logged out successfully");
    res.redirect("/");
})

app.get("/logintypes",(req,res)=>{
  res.render("logintype.ejs");
})

// -------------------------------------------------------------------------------------------------------------------------------------------------

//all users section

app.get("/users",async (req,res)=>{
  let users=await User.find();
  res.render("allUsers.ejs",{users});
})

app.get("/users/:id",async (req,res)=>{
  let {id}=req.params;
   let user=await User.findById(id);
   res.render("oneUser.ejs",{user});
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//jobs

app.get("/jobs",async (req,res)=>{
  let jobs = await Job.find()
  res.render("alljobs.ejs",{jobs})

})

app.get("/jobs/new",(req,res)=>{
  res.render("newjob.ejs");

  
})

app.post("/jobs/new",async (req,res)=>{
  let {title,description,location,experience,company,link}=req.body;
  let newjob=new Job({
    title:title,
    description:description,
    location:location,
    company:company,
    experience:experience,
    link:link,
    userId:res.locals.currentUser._id,
    postedAt:new Date()
  });
  let userId=res.locals.currentUser._id.toString();
  let user=await User.findById(userId);
  console.log(user)
  let savedjob=await newjob.save();
  console.log(savedjob);
  await User.findByIdAndUpdate(
    userId,
    { $push: { jobs: savedjob._id } },
    { new: true, useFindAndModify: false }
);
  res.redirect("/jobs")

})  

app.delete("/jobs/:id",async(req,res)=>{
  let {id}=req.params;
  let userId=res.locals.currentUser._id.toString();
  let modifieduser=await User.findByIdAndUpdate(userId, {
    $pull: { jobs: id }
});
  await Job.findByIdAndDelete(id);
  res.redirect("/jobs");
})


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//admin
app.post("/adminlogin",passport.authenticate("local",{failureRedirect:"/adminlogin", failureFlash:true}),async(req,res)=>{
  //here we need to authenticate the user
  req.flash("success","you have been succesfuly loggedin");
  console.log(req.user)
  res.redirect("/");
})

app.get("/logout",(req,res)=>{
    req.logout((err)=>{
      console.log(err);
    });
    req.flash("success","you have been logged out successfully");
    res.redirect("/");
})
