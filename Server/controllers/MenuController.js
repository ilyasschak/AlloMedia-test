const express = require ('express');
const Menu = require('../models/Menu')
const Restaurant = require('../models/Restaurant')

const fetchMenu = async (req, res) => {
    try {
      const Menus = await Menu.find().populate({
        path: "restaurant",
      }); 
      res.json(Menus);
    } catch (error) {
      console.error('Error fetching Menus:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports = {fetchMenu}