const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swapper.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/games', (req, res) => {
    res.send(["Witcher 3", "For Honor", "Metro EXODUS"])
})

app.listen(8080, (err) => {
    if (err){
        return console.log("Server is not OK")
    }

    console.log("server OK")
})