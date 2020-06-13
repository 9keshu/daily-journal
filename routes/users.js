const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/destroy-session',userController.destroySession);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/'}
),userController.createSession);

module.exports = router;