const restaurant = require("../models/Restaurant");
const menu = require('../models/Menu');
const typeCuisine = require('../models/TypeCuisine');

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

    static async getRestaurant(req, res){
        const {id} = req.params;
        // restaurant - type de cuisine - menu - articles 
        const restaurantResult = await restaurant.findById(id).populate('typeCuisine');
        const menusWithArticles = await menu.aggregate([
          {
            $match: { restaurant: restaurantResult._id },
          },
          {
            $lookup: {
              from: 'articles', 
              localField: '_id',
              foreignField: 'menu',
              as: 'articles',
            },
          },
        ])
        
        res.json({
          restaurant : restaurantResult,
          menus : menusWithArticles
        });

    }
}

module.exports = RestaurantController;