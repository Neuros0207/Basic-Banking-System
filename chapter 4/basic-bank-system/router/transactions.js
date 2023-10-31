import express from 'express'
export const routerTransactions = express.Router()

import * as controller from './../app/controller/index.js'


// V1 in Progress placeholder
// router.post('/api/v1/transactions', controller.transactionsV1.postTransactions)
// router.get('/api/v1/transactions', controller.transactionsV1.getTransactions)
// router.get('/api/v1/transactions/:id', controller.transactionsV1.getTransactionById)
// router.delete('/api/v1/transactions/:id', controller.transactionsV1.deleteTransactionById)



routerTransactions.post('/api/v2/transactions', controller.transactionsV2.postTransactions)
routerTransactions.get('/api/v2/transactions', controller.transactionsV2.getTransactions)
routerTransactions.get('/api/v2/transactions/:id', controller.transactionsV2.getTransactionById)
routerTransactions.delete('/api/v2/transactions/:id', controller.transactionsV2.deleteTransactionById)

