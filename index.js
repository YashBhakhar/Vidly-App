const mongoose = require('mongoose')
const config = require('config')
const express = require('express')
const app = express();
const helmet = require('helmet')
const debug = require('debug')('app:startup')

//routers
const courses = require('./Routes/courses')
const customers = require('./Routes/customers')
const home = require('./Routes/home')
const movies = require('./Routes/movies')
const genre = require('./Routes/genre')
const rental = require('./Routes/rental')

//middleware
app.use(express.json()) // it will check datatype is json or not
app.use(express.urlencoded({extended: true})) // for read query-string
app.use(express.static('public')) // with this we can server styatic content
app.use(helmet())

//configuration
console.log('application name ' + config.get('name'));
console.log('mail service name ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    // console.log('development🔥');
    debug('development🔥')
}

//custome middleware
app.use(function(req,res,next){
    console.log('logging');
    next();
})

app.use(function(req,res,next){
    console.log('Authenticating');
    next();
})

mongoose.connect('mongodb://localhost/vidley')
    .then(()=>console.log('connected to mongodb'))
    .catch(err=>console.log(err))

//routers
app.use('/', home)
app.use('/course', courses)
app.use('/customer', customers)
app.use('/movies', movies)
app.use('/genre', genre)
app.use('/rental', rental)

app.listen('1010', () => console.log('listning port 1010'));
