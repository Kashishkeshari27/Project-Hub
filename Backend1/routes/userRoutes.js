
const route = require('express').Router()
const {verifyToken}= require('../middleware/authMiddle.js')
const {uploadFiles,login,register,dashboard,teachers,forgotPassword,verifyOTP,resetPassword,profile,updateProfile} = require('../controllers/userController.js')


route.post('/signup',register)
route.post('/login',login)
route.get('/dashboard/:id',verifyToken,dashboard)
route.post("/upload",uploadFiles)
route.get('/allteachers',verifyToken,teachers)
route.post("/forgot-password", forgotPassword)
route.post("/verify-otp", verifyOTP)
route.post("/reset-password", resetPassword)
route.get("/profile/:id", verifyToken, profile)
route.put("/profile/:id", verifyToken, updateProfile)


module.exports = route


