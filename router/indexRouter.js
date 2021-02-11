const express = require('express');
const router = express();
const controller = require('../controller/indexController');

/* GET functions */
router.get('/', controller.getHome);
router.get('/feed', controller.getFeed);
router.get('/landing', controller.getLanding);
router.get('/profile', controller.getProfile);
router.get('/profile/:username', controller.getUserProfile);
router.get('/settings', controller.getSettings);

router.get('/view-task/:taskID', controller.getTaskDetails);
router.get('/view-utask/:taskID', controller.getUTaskDetails);
router.get('/edit-task/:taskID', controller.getEditTask);

/* POST functions */
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
router.post('/register', controller.postRegister);
router.post('/update-profile', controller.postUpdateProfile);
router.post('/update-settings', controller.postSettings);

router.post('/add-task', controller.postAddTask);
router.post('/add-utask', controller.postAddUTask);
router.post('/edit-task', controller.postEditTask);
router.post('/complete-task', controller.postCompleteTask);
router.post('/uncomplete-task', controller.postUncompleteTask);
router.post('/private-task', controller.postPrivateTask);
router.post('/public-task', controller.postPublicTask);
router.post('/req-task', controller.postRequestTask);
router.post('/unreq-task', controller.postUnrequestTask);
router.post('/delete-task', controller.postDeleteTask);
router.post('/add-comment', controller.postAddComment);
router.post('/delete-comment', controller.postDeleteComment);


module.exports = router;