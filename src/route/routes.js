const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const vendorController=require('../controller/vendorController');

// userget,useredit

//----------------------------------------------------------------------------------------------------------------------//

//User
router.post("/register", userController.userRegister);

router.post("/login", userController.userLogin);

router.post('/sendotp',userController.sendotp);

router.post('/verifyotp',userController.verifyotp);

router.post('/updatepassword',userController.updatepassword)

router.get('/editUserProfile',userController.editUserProfile)


router.get('/usergetProfile',userController.userget);

router.put('/useredit',userController.useredit)

//vendor

router.post("/vendorRegister", vendorController.vendorRegister);
router.post("/vendors/:id", vendorController.vendorUpdate);
router.post("/vendorDelete", vendorController.vendorDelete);
router.post("/getVendors", vendorController.getVendors);




// global route>>>>>>>>>>
router.all("*", function (req, res) {
  res.status(400).send({
    status: false,
    msg: "please enter valid api",
  });
});

module.exports = router;
