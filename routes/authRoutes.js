var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);  
module.exports = router;
