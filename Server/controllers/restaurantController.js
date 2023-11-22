const restaurant = require("../models/Restaurant");

class RestaurantController{
    static async getAllRestaurants(req, res){
        await restaurant.find({}).then(function(restaurants){
            res.send(restaurants);
        })
    }

    static async searchRestaurants(req, res){
        const keyword = req.body.searchKeyword
        try {
            const result = await restaurant.aggregate([
              {
                $lookup: {
                  from: 'typecuisines',
                  localField: 'typeCuisine',
                  foreignField: '_id', 
                  as: 'typeCuisineData'
                }
              },
              {
                $match: {
                  $or: [
                    { "nom": { $regex: keyword, $options: 'i' } },
                    { "typeCuisineData.name": { $regex: keyword, $options: 'i' } }
                  ]
                }
              }
            ]);
          
            res.send(result);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }          
    }
}

module.exports = RestaurantController;