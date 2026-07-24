const Users= require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendEmail = require("../nodeMailer/sendEmail");

const SECRET= "Kashish"

const login = async(req,res)=>{
    const {email,password} =req.body

    if(!email || !password){
return res.status(401).json({message:"Both Email and Password Necessary"})
    }

try {

    const userData = await Users.findOne({ email })
    
    
    const isMatch = await bcrypt.compare(req.body.password , userData.password)
    if(!isMatch){
        return res.status(400).json("Password missmatch")
    }
    const token = jwt.sign({email:userData.email , id:userData._id},SECRET,{expiresIn:"1d"})
    if(!email)
    {
        return res.status(400).json({message:"Email Not found Please Register"})
    }
    if(userData.role === "Teacher"){
return res.status(200).json({mesaage:"welcome Teacher",role:userData.role,id:userData._id,token})
    }
    res.status(200).json({message:"Login Sucessfull" ,role:userData.role,id:userData._id,token})
} catch (error) {
    res.status(400).json(error)
}
}

const register = async(req,res)=>{
try {
    const addUser = await Users.create(req.body)
    res.status(201).json({message:"User added Sucessfully u Can login now" , addUser})
} catch (error) {
    res.status(400).json(error)
}
}

const dashboard = async(req,res)=>{
try {
    const userProfile = await Users.findById(req.params.id)
    
    res.status(200).json({name:userProfile.name , email:userProfile.email})
} catch (error) {
    res.status(400).json(error)
}
}

const uploadFiles = async (req, res) => {
    try {
        
        
        return res.status(200).json({
            message: 'File uploaded',
            file: {
                originalName: req.file.originalname,
            }
        })
    } catch (error) {
     
        return res.status(500).json({
            message: 'Upload failed',
               error
        })
    }
}
  
const teachers=async(req,res)=>{
    try {
        const allteachers=await Users.find({
            role:"Teacher"
        })
        res.status(200).json(allteachers)
    } catch (error) {
        res.status(400).json(error)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Check whether user exists
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP and expiry (10 minutes)
        user.resetOTP = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        // Send Email
        await sendEmail(
            user.email,
            "Project Hub Password Reset OTP",
            `Your OTP is ${otp}. It is valid for 10 minutes.`
        );

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.log("Forgot Password Error",error);

        return res.status(500).json({
            message: "Something went wrong",
            error:error.message
        });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        if (user.resetOTP !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        return res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required"
            });
        }

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Password update
        user.password = newPassword;

        // Clear OTP
        user.resetOTP = null;
        user.otpExpiry = null;

        // pre("save") automatically hashes the password
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}
module.exports = {login, register, dashboard, uploadFiles ,teachers,forgotPassword,verifyOTP,resetPassword}


