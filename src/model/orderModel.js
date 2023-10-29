const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }, // Reference to the Vendor model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Resturantuser' }, // Reference to the Resturantuser model
  items: [{ name: String, quantity: Number }],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], // Add possible status values
    default: 'Pending', // Set a default value if needed
}
});
module.exports = mongoose.model('Order', orderSchema);

