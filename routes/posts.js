const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
router.get('/get-content/:id',passport.checkAuthentication,postController.loadPost);
router.get('/start-fresh',passport.checkAuthentication,postController.startFresh);
router.post('/update/:id',passport.checkAuthentication,postController.update);
module.exports = router;