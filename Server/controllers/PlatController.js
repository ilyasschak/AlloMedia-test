const express = require('express');
const Plat = require('../models/Article')

const fetchPlat = async (req, res) => {
    const { id } = req.params;
        console.log(req.params);
    try {
      const plat = await Plat.find({ menu: id });
  
      if (!plat) {
        return res.status(404).json({ error: 'Plat not found' });
      }
  
      res.json(plat);
    } catch (error) {
      console.error('Error fetching plat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { fetchPlat };