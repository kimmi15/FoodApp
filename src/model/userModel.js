const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name:{ type: String, unique: true, trim: true },
  email: { type: String, unique: true, trim: true },

  phone: { type: String, required: true, unique: true, trim: true },

  password: { type: String, required: true, minLen: 8, maxLen: 15, trim: true }, // encrypted password
  
  confirmpassword:{ type:String, default:' ' },
  otp: {type: String,required: true, default:' '},


 
}, { timestamps: true })

module.exports = mongoose.model('Resturantuser', userSchema)