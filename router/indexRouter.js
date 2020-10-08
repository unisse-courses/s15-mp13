const express = require('express');
const router = express();
const controller = require('../controller/indexController');

/* GET functions */
router.get('/', controller.getLanding);
// router.get('/home', controller.getHome);
router.get('/profile', controller.getProfile);
router.get('/settings', controller.getSettings);
// router.get('/profile/:username', controller.getUserProfile);

/* POST functions */
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
router.post('/register', controller.postRegister);


module.exports = router;