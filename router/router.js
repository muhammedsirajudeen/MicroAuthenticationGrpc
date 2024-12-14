const express=require("express")
const router=express.Router()
const LoginController=require('../controller/AuthController')

router.post('/login',LoginController.Login)
router.post('/signup',LoginController.Signup)

module.exports=router