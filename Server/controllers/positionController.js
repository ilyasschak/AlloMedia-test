class PositionController {
  static async setDeliveryPosition(req, res,io) {
    
    io.emit("positionChanged", req.body.position);
    console.log(req.body);
  }
}
module.exports = PositionController;
