const express = require('express')
const router = express.Router()


const controller = require('./../app/controller')

// V1 in Progress placeholder
// router.get('/api/v1/users', controller.usersV1.getUsers)
// router.get('/api/v1/users/:id', controller.usersV1.getUsersById)
// router.post('/api/v1/users', controller.usersV1.postUsers)
// router.delete('/api/v1/users/:id', controller.usersV1.deleteUserById)
// router.put('/api/v1/users/:id', controller.usersV1.putUsersById)



router.get('/api/v2/users', controller.usersV2.getUsers)
router.get('/api/v2/users/:id', controller.usersV2.getUsersById)
router.post('/api/v2/users', controller.usersV2.postUsers)
router.delete('/api/v2/users/:id', controller.usersV2.deleteUserById)
router.put('/api/v2/users/:id', controller.usersV2.putUsersById)



module.exports = router