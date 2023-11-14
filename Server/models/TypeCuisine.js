const mongoose = require('mongoose');

const typeCuisineSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
});

const TypeCuisine = mongoose.model('TypeCuisine', typeCuisineSchema);
module.exports = TypeCuisine;