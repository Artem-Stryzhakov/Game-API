const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swapper.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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