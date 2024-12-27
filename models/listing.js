const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description:String,
    image:{
         url:String,
         filename:String,
    },
    price:Number,
    location : String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
    type:String,
    enum:['Ponit'],
    required:true,
    },
    coordinates:{
        type: [Number],
        requires:true,
    },
    category:{
        type:String,
      enum:["trending","rooms","iconic","mountain","castle","amazing","camping","farms","arctic"],
      required:true
    },
});

listingSchema.post("findOneDelete",async (listing)=>{
    if(listing){
    await Review.deleteMany({_id: {$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;