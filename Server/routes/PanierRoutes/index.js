const express = require('express');
const router = express.Router();
const {addToPanier , getPanier , confirmOrder , getCommands} = require('../../controllers/PanierController');
const { verifyLocalToken } = require('../../middlewares/AuthMiddleware');

router.post('/add-to-cart' , verifyLocalToken , addToPanier);
router.post('/confirmOrder', verifyLocalToken , confirmOrder);
router.get('/panier' , verifyLocalToken , getPanier);
router.get('/Commands' , verifyLocalToken , getCommands);

module.exports = router;
