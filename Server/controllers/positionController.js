class PositionController {
  static async setDeliveryPosition(req, res,io) {
    
    io.to(req.body.orderId).emit("positionChanged", req.body.position);
    console.log(req.body);
  }
}
module.exports = PositionController;
