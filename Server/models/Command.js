const mongoose = require('mongoose')

const commandSchema = new mongoose.Schema({
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'InDelivery', 'Delivered'],
      required: true,
    },
    livreur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command