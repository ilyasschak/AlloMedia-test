
const Order = require('../models/Command')

class OrderController {
    
    static async showOrders(req,res){

        const orders = await Order.find();
        
        res.json({ success: true, orders})

    }
}

module.exports =OrderController;
