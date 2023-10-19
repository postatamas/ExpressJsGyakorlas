import { Router, Request, Response, NextFunction } from 'express'; // Express modul és típusok importálása

const router = Router();

// Interfész létrehozása az élelmiszer elemek típusának leírásához
interface GroceryItem {
  item: string;
  quantity: number;
}

// Példa élelmiszer lista létrehozása
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

// Auth ellenőrző middleware hozzáadása
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Inside Groceries Auth Check Middleware');
  console.log(req.user);
  if (req.user) next(); // Ha az auth rendben van, továbblépünk
  else res.sendStatus(401); // Ha nincs auth, küldünk egy 401-es hibakódot
});

// Élelmiszer lista lekérése
router.get('/', (req: Request, res: Response) => {
  res.send(groceryList);
});

// Adott élelmiszer elem lekérése
router.get('/:item', (req: Request, res: Response) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  res.send(groceryItem);
});

// Új élelmiszer elem hozzáadása a listához
router.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  groceryList.push(req.body as GroceryItem); // A típuskényszerítést használjuk, mert TypeScript nem ismeri fel alapból a req.body típusát
  res.sendStatus(201); // A válasz státuszkódjának javítása
});

// Bevásárlókosár lekérése a session-ból
router.get('/shopping/cart', (req: Request, res: Response) => {
  const { cart } = req.session as { cart: { items: GroceryItem[] } }; // A típuskényszerítést használjuk, hogy TypeScript értse a session típusát
  console.log('Cart');
  if (!cart) {
    res.send('You have no cart session');
  } else {
    res.send(cart);
  }
});

// Élelmiszer elem hozzáadása a bevásárlókosárhoz
router.post('/shopping/cart/item', (req: Request, res: Response) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session as { cart: { items: GroceryItem[] } }; // A típuskényszerítést használjuk, hogy TypeScript értse a session típusát
  if (cart) {
    cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.sendStatus(201); // A válasz státuszkódjának javítása
});

export default router;
