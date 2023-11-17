const express = require('express')
const router = express.Router()
const multer = require('multer')()
const controller = require('./../app/controller')
const {auth} = require('../utils/jwt')
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

router.get('/profiles/profile-pic/:user_id', (req,res)=>{
    res.render('uploadAvatar', {user_id : req.params.user_id})
})
router.post('/profiles/profile-pic/:user_id',
            multer.single('image'),
            controller.mediaV2.imagekitUpload,
            controller.usersV2.putProfilePicById)


// v3

router.get('/api/v3/users',auth,  controller.usersV3.getUsers)
router.get('/api/v3/users/:id', auth, controller.usersV3.getUsersById)
router.post('/api/v3/users', auth, controller.usersV3.postUsers)
router.delete('/api/v3/users/:id', auth, controller.usersV3.deleteUserById)
router.put('/api/v3/users/:id', auth, controller.usersV3.putUsersById)



module.exports = router