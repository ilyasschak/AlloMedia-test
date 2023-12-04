const express = require('express');
const router = express.Router();
const {fetchPlat} = require ('../../controllers/PlatController');
const { verifyLocalToken } = require('../../middlewares/AuthMiddleware');

router.get('/plats/:id', fetchPlat);

module.exports = router;