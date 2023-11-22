const express = require('express');
const router = express.Router();
const {addToPanier , getPanier} = require ('../../controllers/PanierController');
const { verifyLocalToken } = require('../../middlewares/AuthMiddleware');

router.post('/add-to-cart', addToPanier);
router.get('/panier' ,verifyLocalToken, getPanier);

module.exports = router;
