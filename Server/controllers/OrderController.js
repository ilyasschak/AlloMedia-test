
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

        const orderComfirmed = await Order.findOne({_id : id}).populate({
            path: 'articles._id',
            module:'Article',
            select: 'Plat prix', 

        }).populate('client')

       




        res.json({ OrderComfirmed:orderComfirmed , message: 'You Order has been comfirmed for'+id });


    }

    static async comfirmOrderFromDelivery(req,res){

        const {id}=req.query 


        const updateStatus1 = await Order.updateOne({_id:id},{$set : {status : "InDelivery"}});

        const orderComfirmed = await Order.findOne({_id : id}).populate({
            path: 'articles._id',
            module:'Article',
            select: 'Plat prix', 

        }).populate('client')

       




        res.json({ OrderComfirmed:orderComfirmed , message: 'You Order has been comfirmed for'+id });


    }

    static async showComfirmOrdersToDelivery(req,res){

        const comfirmedOrders = await Order.find({status : "Confirmed"}).populate({
            path: 'articles._id',
            module:'Article',
            select: 'Plat prix', 

        }).populate('client')

        console.log(comfirmedOrders);

        res.json({comfirmedOrders :comfirmedOrders })

    }

}

module.exports =OrderController;
