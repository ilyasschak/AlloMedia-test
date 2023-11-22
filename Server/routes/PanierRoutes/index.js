const express = require('express');
const router = express.Router();
const {addToPanier} = require ('../../controllers/PanierController');

router.post('/add-to-cart', addToPanier);

module.exports = router;
