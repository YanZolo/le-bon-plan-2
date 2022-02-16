const express = require('express');
const Route = express.Router()


const products = []

Route.get('/', (req, res) => {
    res.send(products)
})
Route.post('/', (req, res) => {
    products.push(req.body.name)
    res.json(products)
    console.log(products)
})

module.exports = Route