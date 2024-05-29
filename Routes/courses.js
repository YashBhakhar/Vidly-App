const mongoose = require('mongoose')
const express = require('express')
const router = express()
const {Course, validate} = require('../Model/courses')

router.get('/', async (req, res) => {
    const genres = await Course.find().sort('name')
    res.send(genres)
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).send('Please enter valid corse ID')
    res.send(course.name)
})

router.post('/', async (req, res) => {
    try {
        const { error } = validateCourse(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        console.log(error)
        let course = new Course({
            name: req.body.name
        })

        course = await course.save()
        res.send(course);
    }
    catch (e) {
        res.send({ "error": true, err: e })
    }
})

router.put('/:id', async (req, res) => {
    const error = validateCourse(req.body)

    if (error) {
        const errorDetails = error.details.map(d => d.message).join('<br>');
        res.status(404).send(errorDetails)
        return;
    }

    const course = await Course.findByIdAndUpdate(res.params.id, { name: req.body.name }, {
        new: true
    })
    if (!course) return res.status(404).send('The course with given id does not exist.')

    res.send(course)
})

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id)
    if (!course) return res.status(404).send('The course with given id does not exist.')

    res.send(course)
})

module.exports = router;