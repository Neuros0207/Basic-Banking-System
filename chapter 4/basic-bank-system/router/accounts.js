import express from 'express'
export const routerAccounts = express.Router()

import * as controller from './../app/controller/index.js'


// V1 in Progress placeholder
// router.get('/api/v1/accounts', controller.accountsV1.getAccounts )
// router.get('/api/v1/accounts/:id', controller.accountsV1.getAccountById)
// router.post('/api/v1/accounts', controller.accountsV1.postAccount)
// router.delete('/api/v1/accounts/:id', controller.accountsV1.deleteAccountById )


routerAccounts.get('/api/v2/accounts', controller.accountsV2.getAccounts )
routerAccounts.get('/api/v2/accounts/:id', controller.accountsV2.getAccountById)
routerAccounts.post('/api/v2/accounts', controller.accountsV2.postAccount)
routerAccounts.delete('/api/v2/accounts/:id', controller.accountsV2.deleteAccountById )



