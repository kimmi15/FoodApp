// Create a Vendor schema
const mongoose = require('mongoose'); // Import Mongoose
const vendorSchema = new mongoose.Schema({
    restaurantName: {
        type:String,
        require:true,
    },
    price: {
        type:String,
        require:true,
    },
    description:  {
        type:String,
        require:true,
    },
    restaurantImage:  {
        type:String,
        require:true,
    },
    // You may want to store the image URL
    foodCategory: { type: String, enum: ['Veg', 'Non Veg'] },

    address: {

        shipping: {
          street: { type: String, required: true, trim: true },
    
          city: { type: String, required: true, trim: true },
    
          pincode: { type: Number, required: true, trim: true }
        },
    
        billing: {
          street: { type: String, required: true, trim: true },
    
          city: { type: String, required: true, trim: true },
    
          pincode: { type: Number, required: true, trim: true }
        }
      }
    
  });
  
  const Vendor = mongoose.model('Vendor', vendorSchema);
  