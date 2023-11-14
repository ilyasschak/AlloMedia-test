const express = require('express');
const { verifyLocalToken, isManager } = require('../../middlewares/AuthMiddleware');
const ManagerController = require('../../controllers/managerController');
const router = express.Router();

router.get('/me', verifyLocalToken, isManager, ManagerController.me)

module.exports = router;