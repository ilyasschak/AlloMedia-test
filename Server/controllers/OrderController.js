
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


        // if (orders.length > 0) {
        //     const order = orders[0];  // Supposons que vous traitez seulement le premier ordre pour cet exemple
        
        //     res.json({
        //         success: true,
        //         client: orders.client.full_name,
        //         orders: order.articles.map(article => article._id.Plat),
        //     });
        // } else {
        //     res.json({
        //         success: true,
        //         client: null,
        //         orders: [],
        //     });
        // }

    
;



       orders.map((order)=>(

       

             
             console.log(order.articles)
        ))




      
        
        res.json({ success: true,
            orders: orders
           

        })

    }
}

module.exports =OrderController;
