const Listing = require("../models/listing.js");



module.exports.index= async (req, res) => {
    const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings});
  };

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
   };

  
  

module.exports.showListing =async(req, res) => {
    let {id} =req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
    populate :
    {
      path: "author",
    },
  })
    .populate("owner");
    if(!listing){
  req.flash("error" ,  "Lisitng You requested does not exist!");
  res.redirect("/listings");
}
console.log(listing);
res.render("listings/show.ejs", {listing});
};

module.exports.createListing=async(req, res, next) =>{
  let url = req.file.path;
  let filename = req.file.filename;
  
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();
    req.flash("success" ,  "New Lisitng created!");
    res.redirect("/listings");

  };

module.exports.editListing=async(req, res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error" ,  "Lisitng You requested does not exist!");
      res.redirect("/listings");
    }
   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
    console.log(listing);

};

module.exports.upadateListing = async(req, res) => {
  let {id} =req.params;
  let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});

  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image= {url, filename};
  await listing.save();
  }
  else{
    req.body.listing.image={filename:"", url:req.body.listing.image};
    console.log(req.body);
  }
  //console.log(req.body);
  req.flash("success" ,  "Lisitng updated!");
  res.redirect(`/listings/${id}`);
};
 
  module.exports.deleteListing = async(req, res) => {
    let {id} =req.params;
   let deletedListing = await  Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success" ,  "Lisitng Deleted!");
   res.redirect("/listings");  

  };

 