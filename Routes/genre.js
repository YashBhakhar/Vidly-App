const mongoose = require('mongoose')
const express = require('express')
const { Genres, validate } = require('../Model/genre')
const router = express.Router()

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genres({
        name: req.body.name
    })

    genre = await genre.save()
    res.send(genre);
})

module.exports = router; 