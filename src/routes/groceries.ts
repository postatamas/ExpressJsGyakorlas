const express = require('express');
const router = express.Router();

// Interfész létrehozása az élelmiszer elemek típusának leírásához
interface GroceryItem {
  item: string;
  quantity: number;
}

// élelmiszer lista létrehozása
const groceryList: GroceryItem[] = [
  {
    item: 'milk',
    quantity: 2,
  },
  {
    item: 'cereal',
    quantity: 1,
  },
  {
    item: 'pop-tarts',
    quantity: 1,
  },
];


/* router.use((req, res, next) => {
  console.log('Inside Groceries Auth Check Middleware');
  console.log(req.user);
  if (req.user) next();
  else res.sendStatus(401);
}); */


router.get('/', (req, res) => {
  res.send(groceryList);
});


router.get('/:item', (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  res.send(groceryItem);
});


router.post('/', (req, res) => {
  console.log(req.body);
  groceryList.push(req.body as GroceryItem);
  res.sendStatus(201);
});


router.get('/shopping/cart', (req, res) => {
  const { cart } = req.session as { cart: { items: GroceryItem[] } };
  console.log('Cart');
  if (!cart) {
    res.send('You have no cart session');
  } else {
    res.send(cart);
  }
});


router.post('/shopping/cart/item', (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session as { cart: { items: GroceryItem[] } };
  if (cart) {
    cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.sendStatus(201);
});

module.exports = router;
