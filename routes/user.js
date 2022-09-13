const express = require('express');
const { createUser, userSignIn, uploadProfile } = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const User = require('../models/user')
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({});



const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb('invalid image file!', false);
    }
}

const uploads = multer({storage, fileFilter});

router.post('/create-user', validateUserSignUp, userValidation ,createUser);
router.post('/sign-in', validateUserSignIn, userValidation ,userSignIn);

router.post('/upload-profile', isAuth, uploads.single('profile'), uploadProfile)

module.exports = router;