const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu
