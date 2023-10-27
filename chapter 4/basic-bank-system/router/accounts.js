const express = require('express')
const router = express.Router()

const controller = require('./../app/controller')


// V1 in Progress placeholder
// router.get('/api/v1/accounts', controller.accountsV1.getAccounts )
// router.get('/api/v1/accounts/:id', controller.accountsV1.getAccountById)
// router.post('/api/v1/accounts', controller.accountsV1.postAccount)
// router.delete('/api/v1/accounts/:id', controller.accountsV1.deleteAccountById )


router.get('/api/v2/accounts', controller.accountsV2.getAccounts )
router.get('/api/v2/accounts/:id', controller.accountsV2.getAccountById)
router.post('/api/v2/accounts', controller.accountsV2.postAccount)
router.delete('/api/v2/accounts/:id', controller.accountsV2.deleteAccountById )



module.exports = router