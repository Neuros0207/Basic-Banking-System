const express = require('express')
const router = express.Router()

const controller = require('./../app/controller')
const {auth} = require('../utils/jwt')

// V1 in Progress placeholder
// router.post('/api/v1/transactions', controller.transactionsV1.postTransactions)
// router.get('/api/v1/transactions', controller.transactionsV1.getTransactions)
// router.get('/api/v1/transactions/:id', controller.transactionsV1.getTransactionById)
// router.delete('/api/v1/transactions/:id', controller.transactionsV1.deleteTransactionById)


// transfer transaction
router.post('/api/v2/transactions/transfers/', auth, controller.transactionsV2.postTransfer)
router.post('/api/v2/transactions/deposits/', auth , controller.transactionsV2.postDeposit)
router.post('/api/v2/transactions/withdraws/', auth , controller.transactionsV2.postWithdraw)
// get all transactions data in database with pagination and search features
router.get('/api/v2/transactions', controller.transactionsV2.getTransactions)
// get the details of account all transactions in bank
router.get('/api/v2/transactions/:id', controller.transactionsV2.getTransactionByAccountId)
router.delete('/api/v2/transactions/:id', controller.transactionsV2.deleteTransactionById)

module.exports = router