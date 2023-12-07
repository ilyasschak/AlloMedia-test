const express = require('express');
const router = express.Router();
const {MenuController} = require ('../../controllers/MenuController')

router.post('/',MenuController.fetchMenu);
router.post('/insert', MenuController.insertMenu);
router.post('/delete', MenuController.deleteMenu);
router.post('/updatePage', MenuController.getMenuById);
router.post('/updateMenu', MenuController.updateMenu);
router.post('/restaurantsMenus', MenuController.getMenuByRestaurant)

module.exports = router;
