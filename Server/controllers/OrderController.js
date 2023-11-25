
const Order = require('../models/Command')
const Article = require('../models/Article')

class OrderController {

    static async showOrders(req,res){

  

       const orders = await  Order.find()
                        .populate({
                            path: 'articles._id',
                            module:'Article',
                            select: 'Plat prix description', 
              
                        }).populate('client')





      
        
        res.json({ success: true,
            orders: orders
           

        })

    }



    static async comfirmOrder(req,res){

        const {id}=req.query 


        const updateStatus = await Order.updateOne({_id:id},{$set : {status : "Confirmed"}});

        console.log(updateStatus);

        res.json({ success: true, message: 'You Order has been comfirmed for'+id });


    }
}

module.exports =OrderController;
