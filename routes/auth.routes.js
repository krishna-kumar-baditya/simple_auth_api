const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const FileUploader = require('../helper/fileUpload')
const fileUploader = new FileUploader({
    folderName : "uploads/profile",
        supportedFiles : ["image/png", "image/jpg", "image/jpeg"],
        fileSize : 1024 * 1024 * 2, // renamed from fieldSize
})
const authCheck = require('../middlewares/authMiddleware')()


router.post('/signup',fileUploader.upload().single("profilePic"),AuthController.signup)
router.post('/signin',AuthController.signin)
router.get('/profile-details',authCheck.authenticateAPI,AuthController.profileDetails)

module.exports = router