const express = require("express");
const PositionController = require("../controllers/positionController");
const router = express.Router();
function routing(io){
    router.post("/",(req,res)=>{ PositionController.setDeliveryPosition(req,res,io)});
    return router
}
module.exports = routing;
