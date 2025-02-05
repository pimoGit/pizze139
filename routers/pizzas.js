// importiamo express e utlizziamo la parte di routing
const express = require('express')
const router = express.Router();


// rotte di CRUD delle pizze
// index
router.get('/', function (req, res) {
    res.send('Lista delle pizze');
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
