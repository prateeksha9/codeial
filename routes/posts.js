const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsContoller = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsContoller.create);
router.get('/destroy/:id', passport.checkAuthentication, postsContoller.destroy);


module.exports=router;