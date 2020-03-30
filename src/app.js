
const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')

const getGeoCode = require('./utils/get-coordinates.js')
const getWeather = require('./utils/getWeather.js')

const app = express()
const port = process.env.PORT;

app.listen(port, () => {
    console.log(chalk.green.inverse('Localhost Started'))
})

//Paths
const pages = path.join(__dirname, './pages/fullviews')
const partialviews = path.join(__dirname, './pages/partials')

//app settings
app.set('view engine', 'hbs')
app.set('views', pages)

//hbs Registries
hbs.registerPartials(partialviews)

//index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ravikumar Basker'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Ravikumar Basker'
    })
})

app.get('/weather', (req, res) => {
    let message = {}
    const city = req.query.city
    if (!city) {
        res.send({
            error: 'The city name is required'
        })
    }
    getGeoCode.getGeoCode(city, (error, { placeName, latitude, longitude }) => {
        if (error) message = 'Error is getting coordinates'
        else {
            getWeather.getWeather(latitude, longitude, (error, { forecast, timezone }) => {
                if (error) message.response = 'Error is getting weather'
                else message.response = 'The timezone is ' + timezone + ' and the forecast looks like ' + forecast
                console.log(message.response)
                res.render('getweather', {
                    placeName,
                    message: message.response,
                    city: city,
                })
            })
        }

    })
})

app.get('/help', (req, res) => {
    console.log('Hello from Help')
    res.render('help', {
        title: 'How can we help you',
        name: 'Ravikumar Basker'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Ahh! We may add this later',
        errorTitle: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Sorry, something went wrong',
        errorTitle: '404: Page not found'
    })
})
