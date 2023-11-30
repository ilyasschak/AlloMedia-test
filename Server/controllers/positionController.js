class PositionController {
  static async setDeliveryPosition(req, res,io) {
    io.emit("positionChanged", req.body.position);
    console.log(req.body.position);
  }
}
module.exports = PositionController;
