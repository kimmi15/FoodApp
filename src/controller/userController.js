const userModel = require('../model/userModel')
const nodemailer=require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//=======================[User Register API]=======================


const userRegister = async function (req, res) {
    try {
        const { email, phone, password } = req.body;
        //phone name

        // Validate the request data
        if (!email || !phone || !password ) {
            return res.status(400).json({ status: false, message: "Please provide all required fields." });
        }

        // Check if the user with the same email or phone number already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ status: false, message: "User with this email or phone already exists." });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new userModel({
            email,
            phone,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        return res.status(201).json({ status: true, message: "User registered successfully",savedUser });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

//===========================[User Login API]==========================


const userLogin = async function (req, res) {
    try {
        const { phone, password } = req.body;

        // Validate the request data
        if (!password && !phone) {
            return res.status(400).json({ status: false, message: "Please provide an password or phone." });
        }
    

        // Check if a user with the provided email or phone exists
        const user = await userModel.findOne( { phone } );

        // If no user is found, return an error
        if (!user) {
            return res.status(400).json({ status: false, message: "User not found." });
        }

        // Check the provided password against the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Invalid password." });
        }

        // Generate a new JWT token for authentication
        const token = jwt.sign({ userId: user._id }, 'Vendorfoodapp', { expiresIn: '1h' });

        return res.status(200).json({ status: true, message: "User logged in successfully", token });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};



//configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sinhakimmi622@gmail.com',
        pass: 'qxee ychm ynpv neue'
    }
    //store otp temporily 
})

const sendotp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    const otp = otpGenerator.generate(6, { digits: true, uppercase: false, specialChars: false });
    // Save the OTP to the database
    await Jobseeker.updateOne({ email: req.body.email }, { otp });
    const mailOptions = {
        from: "kimmikumarisinha@gmail.com",
        to: req.body.email,
        subject: "Email Verification for Nuakri App",
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Email Verification for Nuakri App</h2>
                <p>Hello,</p>
                <p>Your OTP for email verification is: <strong>${otp}</strong></p>
                <p>Please use this OTP to complete your to reset password. Do not share this OTP with anyone.</p>
            </div>
        </body>
        </html>
    `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'failed to send otp' })
        }
        console.log('email sent:' + info.response);
        return res.status(200).json({ message: 'OTP sent sucessfully' })
    })
}


const verifyotp = async (req, res) => {
    try {

        let email = req.body.email;
        let otp = req.body.otp;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and otp is required' })
        }
        let isuser = await  userModel.findOne({ email, otp });

        if (!isuser) {
            return res.status(404).send({ status: false, message: "you enter wrong email or otp" })
        }

        let userID = isuser._id;

        const token = jwt.sign({ _id: userID }, 'JOB@!@%^2466', { expiresIn: '24h' });

        return res.status(200).json({ status: true, msg: "OTP send", token: token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updatepassword = async (req, res) => {
    try {
        let password = req.body.password;
        let confirmpassword = req.body.confirmpassword;
        let token = req.body.token
        if (!password || !confirmpassword) {
            return res.status(400).json({ status: false, message: "Password or confirm password is missing" });
        }
        if (confirmpassword !== password) {
            return res.status(400).json({ status: false, message: "Password or confirm password must same" });
        }
        if (!token) return res.status(400).json({ status: false, message: "Please provide a token" });

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds for hashing
        const hashedconfirmpassword = await bcrypt.hash(confirmpassword, 10); // 10 is the number of rounds for hashing
        const tokenVerify = jwt.verify(token, 'JOB@!@%^2466');
        let changepassword = await  userModel.findOneAndUpdate({ _id: tokenVerify._id }, { $set: { password: hashedPassword, confirmpassword: hashedconfirmpassword, Timewhenyouupadted: new Date() } }, { new: true })

        res.status(200).send({ status: true, data: "Successfully updated password for changepassword " });

    } catch (err) { console.error(err); res.status(500).json({ error: 'Internal Server Error' }); }
}


const editUserProfile = async function (req, res) {
    try {
        const { email, name } = req.body;

        // Validate the request data
        

        // Find the user by their email
        const user = await userModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        // Update the user's phone and name
        user.phone = phone;
        user.name = name;

        // Save the user back to the database
        await user.save();

        return res.status(200).json({ status: true, message: "User profile updated successfully", user });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = { userRegister, userLogin,sendotp ,verifyotp,updatepassword,editUserProfile}