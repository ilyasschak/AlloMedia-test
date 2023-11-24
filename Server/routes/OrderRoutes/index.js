const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/OrderController')

router.get('/show',OrderController.showOrders)
router.get('/comfirm',OrderController.comfirmOrder)

module.exports = router