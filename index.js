const express = require("express");
const app = express();

const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./docs/swapper.json')
const mongodb = require('mongodb').MongoClient;
const yamljs = require('yamljs');
const swapperDocument = yamljs.load('./docs/swapper.yaml')

app.use(express.json())

//const url = "mongodb+srv://artem:WebDevelop@fullstackproject.gx3iiu1.mongodb.net/?retryWrites=true&w=majority"

/*app.post("/addData", (req, res) => {
    mongodb.connect(url, (error, db) => {
        if (error) throw error
        const dbo = db.db('games-API');
        dbo.collection("games").insertOne({name: "Witcher 3", price: 29.99}, (err) => {
            if (error) throw err;
            db.close();
        })
    })f
})*/

const games = [
    {id: 1, name: "Witcher 3", price: 29.99},
    {id: 2, name: "For Honor", price: 29.99},
    {id: 3, name: "Metro EXODUS", price: 19.99},
    {id: 4, name: "Minecraft", price: 19.99},
    {id: 5, name: "CS:Source", price: 5.99},
    {id: 6, name: "The Elder Scrolls Online", price: 49.99},
    {id: 7, name: "GTA 5", price: 29.99},
    {id: 8, name: "Marvel Spider-man", price: 59.99},
    {id: 9, name: "Forza Horizon 5", price: 59.99}
]

app.use('./docs', swaggerUi.serve, swaggerUi.setup(swapperDocument))

app.get('/games', (req, res) => {
    res.send(games)
})

app.get('/games/:id', (req, res) => {
    if (typeof games[req.params.id - 1] === "undefined"){
        return res.status(404).send({
            error: "Game not found"
        })
    }
    res.send(games[req.params.id - 1])
})

app.post('/games', (req, res) => {
    if (!req.body.name && !req.body.price) {
        return res.status(400).send({
            error: "One or all params are missing"
        })
    }

    let game = {
        id: games.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    games.push(game)

    res.status(201).location(`${getBaseUrl(req)}/games/${games.length}`)

    res.end();
})

app.delete('/games/:id', (req, res) => {
    if (typeof games[req.params.id - 1] === 'undefined') return res.status(404).send({error: "Game not found"});

    games.splice(req.params.id - 1, 1)

    res.status(204).send({error: "No content"})
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}

app.listen(8080, (err) => {
    if (err){
        return console.log("Server is not OK")
    }

    console.log("server OK")
})