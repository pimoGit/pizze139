// importiamo express e utlizziamo la parte di routing
const express = require('express')
const router = express.Router();

// importiamo il middleware di check time
const checkTime = require('../middlewares/checkTime');

// uso per l'intero router
// router.use(checkTime);

// Importiamo le funzioni del controller
const pizzaController = require('../controllers/pizzaController');

// rotte di CRUD delle pizze
// index
router.get('/', checkTime, pizzaController.index);

// show
router.get('/:id', pizzaController.show);

// store
router.post('/', pizzaController.store);

// update
router.put('/:id', pizzaController.update);

// modify
router.patch('/:id', pizzaController.modify);

// destroy
router.delete('/:id', pizzaController.destroy);

// esportiamo il modulo del router
module.exports = router;
