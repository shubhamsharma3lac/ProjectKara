const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.post('/user/register', userController.createUser);
router.post('/user/auth/token', userController.loginUser);

module.exports = router;