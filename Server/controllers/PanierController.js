const express = require('express');
const Menu = require('../models/Menu');
const Panier = require('../models/Panier');
const Article = require('../models/Article');
const  Command = require('../models/Command');
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


const confirmOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const userPanier = await Panier.find({ client: userId }).populate({
      path: 'articles.article',
      model: 'Article',
    });

    if (!userPanier || userPanier.length === 0) {
      return res.status(400).json({ error: 'Empty cart. Cannot confirm order.' });
    }

    const newCommand = new Command({
      client: userId,
      articles: userPanier.flatMap((cart) =>
        cart.articles.map((item) => ({
          _id: item.article._id,
          quantite: item.quantite,
        }))
      ),
      status: 'Pending',
    });

    console.log("user : ", userId);
    console.log("panier :", userPanier);
    console.log("command : ", newCommand);

    const confirme = await newCommand.save();
    await Panier.deleteMany({ client: userId });
 
    console.log(confirme);
    res.json({ success: true, message: 'Order confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = { addToPanier, getPanier , confirmOrder};