import express from 'express'
export const routers = express.Router()


import { routerUsers } from './users.js'
import { routerAccounts } from './accounts.js'
import { routerTransactions } from './transactions.js'
routers.use(routerUsers)
routers.use(routerAccounts)
routers.use(routerTransactions)
