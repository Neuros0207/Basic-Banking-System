const express = require('express')
const router = express.Router()

const auth = require('./auth')
const users = require('./users')
const accounts = require('./accounts')
const transactions = require('./transactions')
router.use(auth)
router.use(users)
router.use(accounts)
router.use(transactions)


module.exports = router