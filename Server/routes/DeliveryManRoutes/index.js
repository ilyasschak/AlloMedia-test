const express = require('express');
const { verifyLocalToken, isDeliveryMan } = require('../../middlewares/AuthMiddleware');
const DeliveryManController = require('../../controllers/deliveryManController');
const router = express.Router();

router.get('/me', verifyLocalToken, isDeliveryMan, DeliveryManController.me)

module.exports = router;