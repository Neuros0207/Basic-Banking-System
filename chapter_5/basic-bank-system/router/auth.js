const express = require('express')
const router = express.Router()
const controller = require('./../app/controller')
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
router.get('/api/v2/auth/dashboard', controller.authV2.dashboard)
router.post('/api/v2/auth/register', controller.authV2.registerForm)


// token based authentication
router.get('/whoami', auth , controller.authV2.whoami)
router.post('/register', controller.authV2.registerNewAccount)
router.post('/login', controller.authV2.loginAccount)




// v3 token based


router.post('/api/v3/auth/register', controller.authV3.registerNewAccount)



module.exports = router