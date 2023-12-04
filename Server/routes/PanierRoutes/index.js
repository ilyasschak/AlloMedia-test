const express = require('express');
const router = express.Router();
const {addToPanier , getPanier , confirmOrder , getCommands , updateQuantity} = require('../../controllers/PanierController');
const { verifyLocalToken } = require('../../middlewares/AuthMiddleware');

router.post('/add-to-cart' , verifyLocalToken , addToPanier);
router.post('/confirmOrder', verifyLocalToken , confirmOrder);
router.get('/panier' , verifyLocalToken , getPanier);
router.get('/Commands' , verifyLocalToken , getCommands);
router.put('/updateQuantity/:article' , verifyLocalToken , updateQuantity);

module.exports = router;
