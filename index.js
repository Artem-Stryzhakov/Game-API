import express from "express"

const app = express()

app.get('/', (req, res) => {
    res.send(`
        <style>
            h1 {
            text-align: center;
            }
        </style>
        <h1>Здесь были Артёмы.</h1>
    `)
})

app.listen(8080, (err) => {
    if (err){
        return console.log("Server is not OK")
    }

    console.log("server OK")
})