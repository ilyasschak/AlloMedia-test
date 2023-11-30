const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/OrderController')

router.get('/show',OrderController.showOrders)
router.get('/comfirm',OrderController.comfirmOrder)
router.get('/showComfirmOrdersToDelivery',OrderController.showComfirmOrdersToDelivery)

module.exports = router