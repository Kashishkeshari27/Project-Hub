
const route = require('express').Router()
const {verifyToken}= require('../middleware/authMiddle.js')
const {uploadFiles,login,register,dashboard,teachers} = require('../controllers/userController.js')


route.post('/signup',register)
route.post('/login',login)
route.get('/dashboard/:id',verifyToken,dashboard)
route.post("/upload",uploadFiles)
route.get('/allteachers',verifyToken,teachers)

module.exports = route


