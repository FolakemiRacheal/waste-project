const express = require('express')
const { signUp, login, verifyEmail, resendVerificationEmail, ForgetPassword, changePassword, ResetPassword, makeAdmin, updateUser, deleteUser, oneUser, getAll, logOut } = require('../controller/userC')
const {createWaste} = require("../controller/wasterController")
const { authenticate, isAdmin } = require('../middleware/auth.copy')  
const {  logInValidator ,signUpValidator, validateLogin, validateSignUp} = require('../middleware/validator')

const router = express.Router()

router.post('/signUp',validateSignUp,signUp)
router.post('/sign-in',validateLogin,login)
router.get('/verify/:token',verifyEmail)
router.post('/resend-verification',resendVerificationEmail)
router.post('/forgot-password',ForgetPassword)
router.post('/change-password/:token',changePassword)
router.post('/reset-password/:token',ResetPassword)
router.put('/make-admin/:userId',isAdmin,makeAdmin)
router.put('/update/:userId',updateUser)
router.get('/oneUser/:id',oneUser)
router.get('/getall',getAll)
router.post('/log-out',logOut)
router.delete('/deleteUser/:userId',deleteUser)







router.post("/createWaste/:id", createWaste)

module.exports = router 