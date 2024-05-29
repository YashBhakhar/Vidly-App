const mongoose = require('mongoose')
const { Rental, validate } = require('../Model/rental')
const { Customers } = require('../Model/customers')
const { Movies } = require('../Model/movies')
const express = require('express')
const router = express.Router()
const Fawn = require('fawn')

Fawn.init('mongodb://localhost/vidley')

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut')
    res.send(rental)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const coustomer = await Customers.findById(req.body.customerId)
    if (!coustomer) return res.status(400).send('Invalid Customer')

    const movie = await Movies.findById(req.body.movieId)
    if (!movie) return res.status(400).send('Invalid Movie')

    let rental = new Rental({
        customer: {
            _id: coustomer.customerId,
            name: coustomer.name,
            phone: coustomer.phone
        },
        movie: {
            _id: movie.movieId,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    try {
        const result = await rental.save()

        movie.numberInStock--;
        movie.save()
    
        res.send(result)
    } catch (error) {
        res.status(500).send('Somthing fail')
    }

})

module.exports = router