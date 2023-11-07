const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {PrismaClient} = require('@prisma/client')
const { authUser} = require('./../app/controller/api/v2/auth')
const prisma = new PrismaClient()



passport.serializeUser((user, done) => done(null, user.account_id))
passport.deserializeUser(async (account_id, done)=> {
    done(null, await prisma.accounts.findUnique({
        where : {
            account_id
        }
    }))
})
passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, authUser))

module.exports = passport