const express = require('express')
const router = express.Router()

const controller = require('./../app/controller')


// V1 in Progress placeholder
// router.post('/api/v1/transactions', controller.transactionsV1.postTransactions)
// router.get('/api/v1/transactions', controller.transactionsV1.getTransactions)
// router.get('/api/v1/transactions/:id', controller.transactionsV1.getTransactionById)
// router.delete('/api/v1/transactions/:id', controller.transactionsV1.deleteTransactionById)



router.post('/api/v2/transactions', controller.transactionsV2.postTransactions)
router.get('/api/v2/transactions', controller.transactionsV2.getTransactions)
router.get('/api/v2/transactions/:id', controller.transactionsV2.getTransactionById)
router.delete('/api/v2/transactions/:id', controller.transactionsV2.deleteTransactionById)

module.exports = router