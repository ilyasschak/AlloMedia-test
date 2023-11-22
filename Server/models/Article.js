const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    Plat: {
      type: String,
      required: true,
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: true,
    },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article
