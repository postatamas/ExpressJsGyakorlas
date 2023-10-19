/* const { response } = require('express');
const express = require('express');

const app = express();
const PORT = 3001;

app.listen(PORT, () => console.log(`running server on port ${PORT}!`));

app.get('/groceries', (request, response) => {
    response.send([
        {
            item: 'milk',
            quantity: 1,
        },
        {
            item: 'tea',
            quantity: 2,
        },
    ]);
});
 */

/* const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));

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

app.get('/groceries', (request, response) => {
  response.send(groceryList);
});

app.get('/groceries/:item', (request, response) => {
  const { item } = request.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  response.send(groceryItem);
});

app.post('/groceries', (request, response) => {
  console.log(request.body);
  groceryList.push(request.body);
  response.send(201);
}); */

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
mongoose.set('strictQuery', true);
// const passport = require('passport');
// require('./strategies/local');
// require('./strategies/discord');

// Routes
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');
// const authRoute = require('./routes/auth');

require('./database');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Azt jelenti, hogy az URL kódolás támogatja a bonyolultabb adatstruktúrákat is, míg az extended: false csak egyszerű kulcs-érték párokat fogad el.

app.use(cookieParser());
app.use(
  session({
    secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/expressjs_tutorial',
    }),
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/markets', marketsRoute);
// app.use('/api/v1/auth', authRoute);
app.get('/', (req, res) => {
  res.send('Hello!');
});




app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));