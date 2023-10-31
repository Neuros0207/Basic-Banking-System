import express from 'express'
export const routerUsers = express.Router()


import * as controller from './../app/controller/index.js'

// V1 in Progress placeholder
// router.get('/api/v1/users', controller.usersV1.getUsers)
// router.get('/api/v1/users/:id', controller.usersV1.getUsersById)
// router.post('/api/v1/users', controller.usersV1.postUsers)
// router.delete('/api/v1/users/:id', controller.usersV1.deleteUserById)
// router.put('/api/v1/users/:id', controller.usersV1.putUsersById)



routerUsers.get('/api/v2/users', controller.usersV2.getUsers)
routerUsers.get('/api/v2/users/:id', controller.usersV2.getUsersById)
routerUsers.post('/api/v2/users', controller.usersV2.postUsers)
routerUsers.delete('/api/v2/users/:id', controller.usersV2.deleteUserById)
routerUsers.put('/api/v2/users/:id', controller.usersV2.putUsersById)


