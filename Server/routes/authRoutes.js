const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/register', AuthMiddleware.isLoggedOut, UserController.register);
router.post('/login', AuthMiddleware.isLoggedOut, AuthController.login);
router.post('/sendVerification', AuthController.sendEMailVerification);
router.get('/me', AuthMiddleware.verifyLocalToken, AuthController.me);
router.post('/logout', AuthMiddleware.verifyLocalToken, AuthController.logout);
router.post("/verifyEmail",AuthMiddleware.verifyMailedToken, AuthController.verifyEmail)
router.post("/forgetPassword",AuthController.forgetPassword)
router.post("/resetPassword",AuthMiddleware.verifyMailedToken, AuthController.resetPassword)
router.get("/get-users", AuthController.getUsers)

module.exports = router
