<<<<<<< HEAD
const express = require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
=======
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}


console.log(process.env.SECRET);

const express = require("express");
const app= express();
const mongoose = require("mongoose");
>>>>>>> c2fec04 (Added my project)
const path = require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
const { appendFile } = require("fs");
<<<<<<< HEAD



const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
=======
const ExpressError= require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport= require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingsRouter= require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL;

>>>>>>> c2fec04 (Added my project)

main().then(() =>{
    console.log("connected to DB");
})
.catch((err) => {
  console.log(err);
});


async function main(){
<<<<<<< HEAD
    await mongoose.connect(MONGO_URL);
    
}
=======
  await  mongoose.connect(dbUrl);
    
    
  
    
};
>>>>>>> c2fec04 (Added my project)

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

<<<<<<< HEAD
app.get("/", (req, res) => {
    res.send("Hi I am root");
});

// index route
app.get("/listings", async (req, res) => {
  const allListings= await Listing.find({});
  res.render("listings/index.ejs", {allListings});

});

// New route 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  

//Show route

app.get("/listings/:id", async(req, res) => {
    let {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

// //Create route
app.post("/listings",async (req, res) =>{
 
    const newListing = new Listing(req.body.listing);

    // Save the new listing
    await newListing.save();

    // Redirect to the listings page upon successful creation
    res.redirect("/listings");


});

// edit route

app.get("/listings/:id/edit", async(req, res) =>{
  let {id} =req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
});

// update route 

app.put("/listings/:id" , async(req, res) => {
  let {id} =req.params;
await Listing.findByIdAndUpdate(id, {...req.body.listing});
res.redirect(`/listings/${id}`);
  
});

// Delete route

app.delete("/listings/:id" , async(req, res) => {
  let {id} =req.params;
 let deletedListing = await  Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 res.redirect("/listings");  
});





// app.get("/testListing" , async(req,res) => {
//    let sampleListing = new Listing ({
//       title: "My new villa",
//       description: "By the Beach",
//       price : 1200,
//       location : "Calagunt , Goa",
//       country : "India",
//    });
   
//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("Successfull testing");
   
// });
=======
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto :{
  secret : process.env.SECRET,
    
  },
  touchAfter: 24 * 3600,
});

store.on("error" , () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});


const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie: {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  },
  
};


 


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
 
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// 





app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


  

app.all("*", (req, res, next) =>{
 next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let {statusCode=500, message="Something went wrong"}= err || {};
  res.render("error.ejs",{message});
 // res.status(statusCode).send(message);
  
});
>>>>>>> c2fec04 (Added my project)
 

app.listen(8080, () => {
   console.log("Server is listening to port 8080");
});