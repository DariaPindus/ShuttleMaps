let api = require('./api.js');
const routesParser = require('./data/routes_parser');

const express = require('express')
const app = express()
const port = 8081

const initializeData = async () => {
    await routesParser.initializeRoutesInfo();
}

initializeData();

app.get('/routes', (request, response) => {
    const selected = request.query.selected;
    response.send(api.getRoutes(selected));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

