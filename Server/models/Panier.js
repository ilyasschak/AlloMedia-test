const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
    articles: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
      },
      quantite: {
        type: Number,
        required: true,
      },
    }],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
});

const Panier = mongoose.model('Panier', panierSchema);
module.exports = Panier
