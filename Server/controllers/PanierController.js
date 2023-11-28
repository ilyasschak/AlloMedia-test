const express = require('express');
const Menu = require('../models/Menu');
const Panier = require('../models/Panier');
const Article = require('../models/Article');
const { ObjectId } = require('mongoose').Types;




const addToPanier = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    console.log(req.body);

    if (!menuId || !quantity) throw new Error("Missing parameters");

    

    const menuObjectId = ObjectId.createFromHexString(menuId);
    const menu = await Article.findById(menuObjectId);

    console.log("menu :" , menu._id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    console.log('sucees plat')
   

    const userId = req.user.id;
    console.log("user" , userId);
    console.log('suceess user')
    let userPanier = await Panier.findOne({ user: userId });

    console.log("panier" ,  userPanier);
    if (!userPanier) {
      userPanier = new Panier({ user: userId, client: userId, articles: [
        { article: menuObjectId, quantite:quantity },
      ] });
    }

    console.log("panie : " ,userPanier);

    const existingItem = userPanier.articles.find((item) => item.article.equals(menuObjectId));

    if (!existingItem) {
      userPanier.articles.push({ menu: menuObjectId, quantite: quantity});
    }

    console.log("existing" , existingItem);

    await userPanier.save();

    res.json(userPanier);
    console.log(userPanier);
  } catch (error) {
    console.error('Error adding item to Panier:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPanier = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  
  try {
    const userPanier = await Panier.find({ client: userId })
      .populate({ path: "articles.article", model: "Article", select: "Plat prix description" });
    console.log(userPanier[0].articles);
    if (userPanier.length === 0) {
      return res.status(404).json({ error: 'Panier not found for this user' });
    }

    res.json(userPanier);
  } catch (error) {
    console.error('Error getting Panier:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};


module.exports = { addToPanier, getPanier};