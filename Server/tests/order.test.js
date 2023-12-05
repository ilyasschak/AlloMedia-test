const OrderController = require("../controllers/OrderController");
const Order = require("../models/Command");

jest.mock('../models/Command', () => ({
  find: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
}));

describe('getOrder function', () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  
  it('should return orders with populated data', async () => {
         const mockOrders = [
        {
            "_id": "656ca2070f57762fae8bbed8",
            "client": {
                "_id": "65688b33d84b11702be2a527",
                "full_name": "vinabohew@mailinator.com",
                "email": "vinabohew@mailinator.com",
                "password": "$2a$10$hYjMWk9EnQmtIl8myLVQQ.6Drntm5yRmfFrA3vkxEUvrz0sL1LHAK",
                "phone_number": "vinabohew@mailinator.com",
                "verified": true,
                "approved": false,
                "role": "6567d3a2be3ffcc227cbcafd",
                "__v": 0
            },
            "articles": [
                {
                    "_id": {
                        "_id": "6567d3acbe3ffcc227cbcb58",
                        "Plat": "Licensed Wooden Soap",
                        "prix": 523,
                        "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support"
                    },
                    "quantite": 2
                },
                {
                    "_id": {
                        "_id": "6567d3acbe3ffcc227cbcb51",
                        "Plat": "Intelligent Granite Towels",
                        "prix": 75,
                        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016"
                    },
                    "quantite": 3
                },
                {
                    "_id": {
                        "_id": "6567d3acbe3ffcc227cbcb4d",
                        "Plat": "Sleek Granite Towels",
                        "prix": 936,
                        "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"
                    },
                    "quantite": 2
                }
            ],
            "status": "InDelivery",
            "__v": 0
        }
    ];
  
        const req={}


   

    const orders = await OrderController.showOrders(req,res)
  

   expect(res.status).toHaveBeenCalledWith(200);
   expect(res.json).toHaveBeenCalledWith({ success: true,
        orders: {
    find: expect.any(Function),
    populate: expect.any(Function),
  },
    });

  });
});