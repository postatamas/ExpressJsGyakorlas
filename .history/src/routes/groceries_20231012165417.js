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

/* router.get('/', async (request, response) => {
  try {
    const groceryItems = await GroceryItem.find();
    response.send(groceryItems);
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
}); */

/* router.get('/', async (request, response) => {
  try {
    // Az összes elem lekérdezése MongoDB-ből lekorlátozva az első 10-re.
    const groceryItems = await GroceryItem.find().limit(10);
    response.send(groceryItems);
  } catch (error) {
    // Hibakezelés
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
}); */

router.get('/', async (request, response) => {
  try {
    let limit = 10; // alap limit 10

    // Ellenőrizi, hogy a 'limit' lekérdezési paraméter meg van-e adva.
    if (request.query.limit) {
      limit = parseInt(request.query.limit); // A limit lekérdezése 
    }

    // Elemek kinyerése a megadott limit után. A sort() metódus 1 növekső sorrendbe rak, a -1 csökkenőbe
    const groceryItems = await GroceryItem.find().limit(limit).sort({ item: 1 });
    response.send(groceryItems);
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});

router.get('/assignee/:assignee', async (request, response) => {
  try {
    const { assignee } = request.params;

    // item keresése a megadott assinee alapján
    const groceryItems = await GroceryItem.find({ assignee });

    if (groceryItems.length > 0) {
      response.send(groceryItems);
    } else {
      response.status(404).send(`No items found for ${assignee}`);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});



/* router.get('/:item', async (request, response) => {
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
}); */

router.get('/:item', async (request, response) => {
  try {
    const { item } = request.params;

    // Keresés név alapján a MongoDB-böl
    const groceryItem = await GroceryItem.findOne({ item });

    if (groceryItem) {
      response.send(groceryItem);
    } else {
      response.status(404).send('No item found');
    }
  } catch (error) {
    // Hibakezelés
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});


/* router.post('/', async (request, response) => {
  try {
    const { item, quantity } = request.body;
    const groceryItem = new GroceryItem({ item, quantity });
    await groceryItem.save();
    response.sendStatus(201);
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
}); */

router.post('/', async (request, response) => {
  try {
    const { item, quantity } = request.body;

    // A GroceryItem modell új példányának létrehozása
    const groceryItem = new GroceryItem({ item, quantity });

    // Az item mentése a MongoDB gyűjteménybe
    await groceryItem.save();

    // Sikeres válasz küldése
    response.sendStatus(201);
  } catch (error) {
    // Hibakezelés
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});

module.exports = router;
