// importo i dati
const menu = require('../data/pizzas');


// gruppo delle funzione della logica relativa alle rotte delle pizze

function index(req, res) {
    // res.send('Lista delle pizze');
    // res.json(menu);
    // inseriamo un errore
    throw new Error("Errore di test");
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
}

function show(req, res) {
    // res.send('Dettagli della pizza ' + req.params.id);

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il pizza tramite id
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

    // Restituiamolo sotto forma di JSON   
    res.json(pizza);
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

    // cerchiamo il pizza tramite id
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

    // cancello la pizza trovata
    menu.splice(menu.indexOf(pizza), 1);

    // log di riscontro di check su aggiornamento dati
    console.log(menu);



    // ritorno la risposta positiva di avvenuta cancellazione
    res.sendStatus(204);
}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }