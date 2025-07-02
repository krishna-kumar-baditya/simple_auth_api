const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const FileUploader = require('../helper/fileUpload')
const fileUploader = new FileUploader({
    folderName : "uploads/profile",
        supportedFiles : ["image/png", "image/jpg", "image/jpeg"],
        fileSize : 1024 * 1024 * 2, // renamed from fieldSize
})
const authCheck = require('../middlewares/auth.middleware')()
const roleCheck = require('../middlewares/role.middleware')

router.get('/profile-details',authCheck.authenticateAPI,UserController.profileDetails)
router.get('/users',authCheck.authenticateAPI,roleCheck('admin'),UserController.getAllUsers)
router.get('/edit',authCheck.authenticateAPI,UserController.getSpecificUser)
router.get('/delete/:id',authCheck.authenticateAPI,UserController.deleteUser)

module.exports = router