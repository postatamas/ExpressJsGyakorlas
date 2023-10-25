
// Teljes szövegű keresés endpoint
router.get('/search/:query', async (req, res) => {
  const { query } = req.params;

  try {
    // Teljes szövegű keresés az "item" mezőn
    const searchResults = await GroceryItem.aggregate([
      {
        $search: {
          text: {
            query: query,
            path: "item",
          },
        },
      },
    ]);

// :query utvonalparaméter ami a keresési lekérdezést tartalmazza. a query változóba mentkük a keresési lekérdezést
/* 
 A $search operátor egy MongoDB operátor, amely a teljes szövegű keresési funkciókhoz kapcsolódik.

    Az $search operátor a teljes szövegű keresést teszi lehetővé.
    A text kulcs alatt megadhatjuk a keresési paramétereket.
    A query kulcsban a keresett kifejezés található, ami az előző lépésben a query változóból származik.
    A path kulcs az adatbázisban keresett mező nevét tartalmazza, ebben az esetben az "item" mezőt keresi.
*/

    // Válasz elküldése a talált eredményekkel
    res.json(searchResults);
  } catch (error) {
    // Hibakezelés és hibaüzenet küldése
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// Regex-es keresés

router.get('/search/:query', async (req, res) => {
  const { query } = req.params;

  try {
    // Regex keresés az "item" mezőben
    const searchResults = await GroceryItem.find({ item: { $regex: new RegExp(query, 'i') } });

    // Válasz elküldése a talált eredményekkel
    res.json(searchResults);
  } catch (error) {
    // Hibakezelés és hibaüzenet küldése
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


/* A new RegExp(query, 'i') rész regex objektumot hoz létre a keresett query szöveg alapján.
 A i opció a regex kereséshez, jelentése hogy a keresés nem különbözteti meg a kis- és nagybetűket.

Ezzel a megközelítéssel a regex keresést alkalmazva a GroceryItem modell item mezőjében lehet keresni,
 és a talált eredményeket vissza lehet küldeni a kliensnek. */

