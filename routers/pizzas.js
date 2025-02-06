// importiamo express e utlizziamo la parte di routing
const express = require('express')
const router = express.Router();

// Importiamo le funzioni del controller
const pizzaController = require('../controllers/pizzaController');

// rotte di CRUD delle pizze
// index
router.get('/', pizzaController.index);

// show
router.get('/:id', pizzaController.show);

// store
router.post('/', function (req, res) {
    res.send('Creazione nuova pizza');
});

// update
router.put('/:id', function (req, res) {
    res.send('Modifica integrale della pizza ' + req.params.id);
});

// modify
router.patch('/:id', function (req, res) {
    res.send('Modifica parziale della pizza ' + req.params.id);
});

// destroy
router.delete('/:id', pizzaController.destroy);

// esportiamo il modulo del router
module.exports = router;
