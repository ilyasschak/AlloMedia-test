const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
    typeCuisine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeCuisine',
      required: true,
    },
    emplacement: {
      type: Array,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant