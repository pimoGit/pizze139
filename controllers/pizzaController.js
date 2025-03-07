// importo i dati
// const menu = require('../data/pizzas');

// Importiamo il file di connessione al database
const connection = require('../data/db');


// gruppo delle funzione della logica relativa alle rotte delle pizze

function index(req, res) {

    // creiamo la query da lanciare
    const sql = 'SELECT * FROM pizzas';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
        console.log(results);

    });
}

function show(req, res) {
    // res.send('Dettagli della pizza ' + req.params.id);

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // query di richiamo singola pizza tramite ID
    const sql = 'SELECT * FROM pizzas WHERE id = ?';

    // chiamata tramite mysql2 a DB pizzeria
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Pizza not found' });

        // Salviamo temporaneamente la pizza (come oggetto di ritorno dal DB)
        const pizza = results[0];

        // Prepariamo la query per gli ingredienti aiutandoci con una join e Where
        const ingredientsSql = `
            SELECT ingredients.*
            FROM ingredients
            JOIN ingredient_pizza ON ingredients.id = ingredient_pizza.ingredient_id
            WHERE ingredient_pizza.pizza_id = ?
            `;


        // Se è andata bene, eseguiamo la seconda query per gli ingredienti
        connection.query(ingredientsSql, [id], (err, ingredientsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggoiungiamo gli ingredienti alla pizza
            pizza.ingredients = ingredientsResults;
            res.json(pizza);
        });
    });




}

function store(req, res) {
    // console.log(req.body);
    // res.send('Creazione nuova pizza');

    // Creiamo un nuovo id incrementando l'ultimo id presente
    // const newId = menu[menu.length - 1].id + 1;
    const ultimaPizza = menu[menu.length - 1];
    const idUltimaPizza = ultimaPizza.id;
    const newId = idUltimaPizza + 1;

    // Creiamo un nuovo oggetto pizza
    const newPizza = {
        id: newId,
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients
    }

    // Aggiungiamo la nuova pizza al menu
    menu.push(newPizza);

    // controlliamo
    console.log(menu);


    // Restituiamo lo status corretto e la pizza appena creata
    res.status(201);
    res.json(newPizza);
}

function update(req, res) {
    // res.send('Modifica integrale della pizza ' + req.params.id);

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo la pizza tramite id
    const pizza = menu.find(pizza => pizza.id === id);

    // Facciamo il controllo
    if (!pizza) {

        // ritorno lo stato di errore 404, non trovato
        res.status(404);

        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    //  modifichiamo i dati della pizza trovata
    pizza.name = req.body.name;
    pizza.image = req.body.image;
    pizza.ingredients = req.body.ingredients;

    // stampiamo in console il menu
    console.log(menu);


    // ritorniamo l'oggetto modificato
    res.json(pizza);
}

function modify(req, res) {
    // res.send('Modifica parziale della pizza ' + req.params.id);

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo la pizza tramite id
    const pizza = menu.find(pizza => pizza.id === id);

    // Facciamo il controllo
    if (!pizza) {

        // ritorno lo stato di errore 404, non trovato
        res.status(404);

        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    //  modifichiamo i dati della pizza trovata
    // if (req.body.name) {
    //     pizza.name = req.body.name;
    // } else {
    //     pizza.name = pizza.name;
    // }
    // versione operatore ternario
    req.body.name ? pizza.name = req.body.name : pizza.name = pizza.name;
    req.body.image ? pizza.image = req.body.image : pizza.image = pizza.image;
    req.body.ingredients ? pizza.ingredients = req.body.ingredients : pizza.ingredients = pizza.ingredients;

    // stampiamo in console il menu
    console.log(menu);


    // ritorniamo l'oggetto modificato
    res.json(pizza);
};

function destroy(req, res) {
    // res.send('Eliminazione della pizza ' + req.params.id);

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    const sql = 'DELETE FROM pizzas WHERE id = ?';

    //Eliminiamo la pizza dal menu                       
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete pizza' });
        res.sendStatus(204)
    });
}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }