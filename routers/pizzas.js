// importiamo express e utlizziamo la parte di routing
const express = require('express')
const router = express.Router();


// Importiamo il menu, in modo che sia visibile a tutti
const menu = require('../data/pizzas');

// rotte di CRUD delle pizze
// index
router.get('/', function (req, res) {
    // res.send('Lista delle pizze');
    // res.json(menu);

    //Inizialmente, il menu filtrato corrisponde a quello originale
    let filteredMenu = menu;

    // Se la richiesta contiene un filtro, allora filtriamo il menu
    if (req.query.ingredient) {
        filteredMenu = menu.filter(
            pizza => pizza.ingredients.includes(req.query.ingredient)
        );
    }

    // restituiamo la variabile filteredMenu
    // potrebbe essere stata filtrata o contenere il menu originale
    res.json(filteredMenu);
});
// show
router.get('/:id', function (req, res) {
    res.send('Dettagli della pizza ' + req.params.id);
});
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
router.delete('/:id', function (req, res) {
    res.send('Eliminazione della pizza ' + req.params.id);
});

// esportiamo il modulo del router
module.exports = router;
