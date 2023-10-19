/* const { Router } = require('express');

const router = Router();

const groceryList = [
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

router.use((req, res, next) => {
  console.log('Inside Groceries Auth Check Middleware');
  console.log(req.user);
  if (true) next();
  else res.status(400).send('Nem szabad');
});

router.get('/', (request, response) => {
  response.send(groceryList);
});

router.get('/:item', (request, response) => {
  console.log(request.cookies);
  const { item } = request.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  response.send(groceryItem);
});


router.post('/', (request, response) => {
  console.log(request.body);
  groceryList.push(request.body);
  response.send(201);
});

router.get('/shopping/cart', (request, response) => {
  const { cart } = request.session;
  console.log('Cart');
  if (!cart) {
    response.send('You have no cart session');
  } else {
    response.send(cart);
  }
});

router.post('/shopping/cart/item', (request, response) => {
  const { item, quantity } = request.body;
  const cartItem = { item, quantity };
  const { cart } = request.session;
  if (cart) {
    request.session.cart.items.push(cartItem);
  } else {
    request.session.cart = {
      items: [cartItem],
    };
  }
  response.send(201);
});

module.exports = router; */

const { Router } = require('express');
const GroceryItem = require('../database/schemas/GroceryItem');

const router = Router();

router.use((req, res, next) => {
  console.log('Inside Groceries Auth Check Middleware');
  console.log(req.user);
  if (true) next();
  else res.status(400).send('Nem szabad');
});

router.get('/', async (request, response) => {
  try {
    const groceryItems = await GroceryItem.find();
    response.send(groceryItems);
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});

router.get('/:item', async (request, response) => {
  try {
    const { item } = request.params;
    const groceryItem = await GroceryItem.findOne({ item });
    if (groceryItem) {
      response.send(groceryItem);
    } else {
      response.status(404).send('Item not found');
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});

router.post('/', async (request, response) => {
  try {
    const { item, quantity } = request.body;
    const groceryItem = new GroceryItem({ item, quantity });
    await groceryItem.save();
    response.sendStatus(201);
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});

module.exports = router;
