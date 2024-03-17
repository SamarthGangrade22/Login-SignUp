const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
   firstname:{
      type: String, 
      required: false
   },
   lastname:{
      type: String, required: false
   },
   username:{
      type: String, 
      required: true
   },
   email:{
      type: String, 
      required: true, unique: true
   },
   password: {
      type: String,
      required: true 
   },
   likedSongs:{
      type: String, 
      default:""
   },
   likedPlaylist:{
      type: String, 
      default:""
   },
   subscribedArtist:{
      type: String, 
      default:""
   }
  });
  
  const Data = mongoose.model("Data", DataSchema);
  module.exports = Data;