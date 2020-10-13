const express = require('express');
const router = express();
const controller = require('../controller/indexController');

/* GET functions */
router.get('/landing', controller.getLanding);
router.get('/', controller.getHome);
router.get('/profile', controller.getProfile);
router.get('/view-comments/:taskID', controller.getTaskComments);
router.get('/edit-task/:taskID', controller.getEditTask);
router.get('/settings', controller.getSettings);
// router.get('/profile/:username', controller.getUserProfile);

/* POST functions */
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
router.post('/register', controller.postRegister);
router.post('/add-task', controller.postAddTask);



module.exports = router;