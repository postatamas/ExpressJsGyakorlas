const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('GroceryItem', groceryItemSchema);