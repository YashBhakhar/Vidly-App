const {Customers, validate} = require('../Model/customers')
const mongoose = require('mongoose')
const express = require('express')
const router = express()

router.get('/', async (req, res) => {
    const customers = await Customers.find().sort('name')
    res.send(customers)
})

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        console.log(error)
        let customer = new Customers({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })

        customer = await customer.save()
        res.send(customer);
    }
    catch (e) {
        res.send({ "error": true, err: e })
    }
})



module.exports = router;