/* const mongoose = require('mongoose');

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

module.exports = mongoose.model('GroceryItem', groceryItemSchema); */

/* const mongoose = require('mongoose');

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

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

module.exports = GroceryItem; */

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
  assignee: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

module.exports = GroceryItem;

