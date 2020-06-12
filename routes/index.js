const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const signUpController = require('../controllers/sign_up_controller');
router.get('/',homeController.home);
router.get('/sign-up',signUpController.signUp);

module.exports = router;
console.log('Router Loaded!');