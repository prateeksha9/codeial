const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

// for any further routes access from here
// router.use('./routerName', require('./routerfile'));
router.get('/', homeController.home);
router.use('/users', require('./users'));

module.exports = router;