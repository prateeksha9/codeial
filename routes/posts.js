const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsContoller = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsContoller.create);


module.exports=router;