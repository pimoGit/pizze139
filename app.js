const express = require('express')
const app = express()
const port = 3000

// definiamo l'uso di una cartella per i file statici
app.use(express.static('public'));

// definiamo la rotta home
app.get('/', (req, res) => {
    res.send("Ciao sono la rotta Home, della mia pizzeria!!!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})