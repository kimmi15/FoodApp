
const vendorModel = require('../model/vendorModel')
const vendorRegister = async function (req, res) {
    try {

        const { restaurantName, price, description, restaurantImage, foodCategory } = req.body;

        const newVendor = new vendorModel({
          restaurantName,
          price,
          description,
          restaurantImage,
          foodCategory,
        });
    
        const savedVendor = await newVendor.save();
    
        res.status(201).json({ status: true, message: 'Vendor registered successfully', vendor: savedVendor });
    }
       catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};


const vendorUpdate = async function (req, res) {
    try {
        const vendorId = req.params.id; // Assuming you pass the vendor's ID in the URL parameter
        const updates = req.body; // Object containing fields to update

        const updatedVendor = await vendorModel.findByIdAndUpdate(vendorId, updates, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ status: false, message: 'Vendor not found' });
        }

        res.status(200).json({ status: true, message: 'Vendor updated successfully', vendor: updatedVendor });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

const vendorDelete = async function (req, res) {
    try {
        const vendorId = req.params.id; // Assuming you pass the vendor's ID in the URL parameter

        const deletedVendor = await vendorModel.findByIdAndRemove(vendorId);

        if (!deletedVendor) {
            return res.status(404).json({ status: false, message: 'Vendor not found' });
        }

        res.status(200).json({ status: true, message: 'Vendor deleted successfully', vendor: deletedVendor });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};


const getVendors = async function (req, res) {
    try {
        const vendors = await vendorModel.find();

        res.status(200).json({ status: true, vendors });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};


module.exports={vendorRegister,vendorUpdate,vendorDelete,getVendors}

