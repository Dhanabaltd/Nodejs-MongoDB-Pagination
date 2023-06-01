const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.user_add);

router.get('/', userController.all_users);

module.exports = router;