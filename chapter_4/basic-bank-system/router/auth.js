const express = require('express')
const router = express.Router()
const controller = require('./../app/controller/api/v2/auth')
const passport = require('./../utils/passport')
const {auth} = require('../utils/jwt')


// session based authentication
router.post('/api/v2/auth/login', passport.authenticate('local',{
    successRedirect : '/api/v2/auth/dashboard',
    failureRedirect : '/api/v2/auth/login'
}))
router.get('/api/v2/auth/register', async(req,res)=>{
    res.render('register')
})
router.get('/api/v2/auth/login', async (req,res)=>{
    res.render('login')
})
router.get('/api/v2/auth/dashboard', controller.dashboard)
router.post('/api/v2/auth/register', controller.registerForm)






// token based authentication
router.get('/whoami', auth , controller.whoami)
router.post('/register', controller.registerNewAccount)
router.post('/login', controller.loginAccount)




module.exports = router