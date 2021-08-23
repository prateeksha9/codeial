const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsContoller = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsContoller.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsContoller.destroy);
// router.get('/destroy/:id', passport.checkAuthentication, postsContoller.destroy);


module.exports=router;