const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });






// index route and Create route
router.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn,  upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));


 // New route 
 router.get("/new", isLoggedIn , listingController.renderNewForm);
 
    
// show update and Delete
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner, upload.single("listing[image]"),  validateListing , wrapAsync(listingController.upadateListing))
.delete( isLoggedIn,isOwner, wrapAsync(listingController.deleteListing ));

// Edit route

router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports= router;
  

  
  
 
    
  
 
 
  
    

  