const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Steven'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Steven'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Please enter your question',
        title: 'Help',
        name: 'Steven'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.status(400).send({error: 'not address provide'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({error})
            
        }
        forecast(longitude,latitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('notFound', {
        title: 'Not found',
        message: 'My 404 page',
        name: 'Steven'
    })
})

app.listen(port, () => {
    console.log('listening on port '+ port)
})