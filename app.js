const express = require('express')
const app = express()
const port = 3000

// definiamo l'uso di una cartella per i file statici
app.use(express.static('public'));

// definiamo la rotta home
app.get('/', (req, res) => {
    res.send("Ciao sono la rotta Home, della mia pizzeria!!!");
})

// definiamo una rotta dettaglio prodotto per testare un parametro dinamico	
app.get('/products/:id', function (req, res) {
    console.log(`Hai richiesto il prodotto con ID: ${req.params.id}`);
    res.send(`Hai richiesto il prodotto con ID: ${req.params.id}`);
})


// definiamo la rotta menù della pizzeria
app.get('/menu', (req, res) => {
    // array di pizze da ritornare
    const menu = [
        {
            id: 1,
            name: "Margherita",
            image: "http://localhost:3000/pizze/margherita.webp",
            ingredients: ["pomodoro", "mozzarella"],
        }, {
            id: 2,
            name: "Marinara",
            image: "http://localhost:3000/pizze/marinara.jpeg",
            ingredients: ["pomodoro", "aglio", "origano"],
        }, {
            id: 3,
            name: "Diavola",
            image: "http://localhost:3000/pizze/diavola.jpeg",
            ingredients: ["pomodoro", "mozzarella", "salame piccante"],
        }, {
            id: 4,
            name: "Bufalina",
            image: "http://localhost:3000/pizze/bufalina.jpeg",
            ingredients: ["pomodoro", "mozzarella di bufala"],
        }, {
            id: 5,
            name: "4 formaggi",
            image: "http://localhost:3000/pizze/4_formaggi.jpeg",
            ingredients: ["pomodoro", "mozzarella", "gorgonzola", "parmigiano", "ricotta"],
        }
    ];

    // ritorniamo l'array di pizze in formato Json per questo ednpoint dell'API
    res.json(menu);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})