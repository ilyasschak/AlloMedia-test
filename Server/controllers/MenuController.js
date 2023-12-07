const express = require ('express');
const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');
const article = require('../models/Article'); 
const User = require('../models/User');
const Article = require('../models/Article');

class MenuController{

  static async fetchMenu  (req, res) {
    const {owner_id} = req.body;
    const user = await User.findById(owner_id);
    const Menus = await Menu.aggregate([
      {
        $lookup: {
          from: 'restaurants',
          localField: 'restaurant',
          foreignField: '_id',
          as: 'restaurant',
        },
      },
      {
        $match: {
          'restaurant.owner': user?._id,
        },
      },
    ]);
    res.json(Menus);
  }

    static async insertMenu(req, res){
      const { menuName, restaurant, articles } = req.body.values;

      const menu = {
        nom : menuName,
        restaurant : restaurant
      }

      const {_id} = await Menu.create(menu);

      articles.forEach((article) => {
        article.menu = _id;
      });

      await article.insertMany(articles);

      res.send("Inserted Successfully")
    }

    static async deleteMenu(req, res){
      const { idToDelete } = req.body;

      await Menu.findByIdAndDelete(idToDelete);
      await article.deleteMany({"menu" : idToDelete});

      res.send("Deleted Successfully")
    }

    static async getMenuById(req, res){
      const { menuId } = req.body;
      
      const menu = await Menu.findById(menuId).populate('restaurant');
      const plats = await article.find({menu : menu._id});

      res.json({
        menu : menu,
        plats : plats,
      })
    }

    static async updateMenu(req, res){
      const {menu, articles} = req.body;
      
      await Menu.updateOne(
        {_id : menu.id}, 
        {
          $set : {
            nom : menu.name,
            restaurant : menu.restaurant
          }
        }
      )
      
      const menuArticles = await Article.find({menu : menu.id});

      const articleWithoutId = articles.find(article => !article._id);
      if(articleWithoutId){
        articleWithoutId.menu = menu.id
        await Article.create(articleWithoutId);
      }
      
      menuArticles.forEach(async (menuArticle) => {
        const existingArticle = articles.find(
          (article) => article._id == menuArticle._id
        )

        if(existingArticle){
          await Article.updateOne(
            { _id: existingArticle._id },
            {
              $set: {
                Plat : existingArticle.Plat,
                description : existingArticle.description,
                prix : existingArticle.prix
              },
            }
          );
        }else{
          await Article.deleteOne({ _id: menuArticle._id });
        }
      })

      res.send("updated successfully!")
    }

    static async getMenuByRestaurant(req, res){
      const menus = await Menu.find({restaurant : req.body.restaurantId});
      res.send(menus);
    }
}

  module.exports = {MenuController}