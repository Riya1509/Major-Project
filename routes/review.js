const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Reviews = require("../models/reviews.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

//Review
//Post  review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview ));
    
 // Delete Review route
    
    router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

    module.exports = router;