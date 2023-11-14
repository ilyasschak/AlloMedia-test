const express = require('express');
const { verifyLocalToken, isClient } = require('../../middlewares/AuthMiddleware');
const ClientController = require('../../controllers/clientController');
const router = express.Router();

router.get('/me',verifyLocalToken, isClient, ClientController.me)

module.exports = router;