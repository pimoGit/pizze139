const express = require('express')
const app = express()
const port = 3000
// importiamo il roputer delle pizze
const pizzasRouter = require('./routers/pizzas');


// definiamo l'uso di una cartella per i file statici
app.use(express.static('public'));

// registro il body-parser per "application/json"
app.use(express.json());

// definiamo la rotta home
app.get('/', (req, res) => {
    res.send("Ciao sono la rotta Home, della mia pizzeria!!!");
})

// utilizziamo la rotta delle pizze andando a definire la parte iniziale delle rotte
app.use("/pizzas", pizzasRouter)


// avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})