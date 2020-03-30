const request = require('request')
const chalk = require('chalk')

let getWeatherURL = 'https://api.darksky.net/forecast/eaa5ac0019a023d67559625550297a4f/37.8267,-122.4233?lang=es&unit=us'
let darkskyURL = 'https://api.darksky.net/forecast/eaa5ac0019a023d67559625550297a4f/'


const getWeather = (latitude, longitude,callback) => {

    // //To get the forecast, temperature- high and low for a city
    // getWeatherURL = darkskyURL + data.latitude + ',' + data.longitude
    // request({ url: getWeatherURL, json: true }, (error, { timezone, daily }) => {
    //     if (error) {
    //         callback(error,
    //             {
    //                 error: "Some error occurred"
    //             })
    //     }
    //     else{
    //         callback(error,{
    //             timezone: timezone,
    //             forecast: daily.summary
    //         })
    //     }
    // })
    // }

    //To get the Humidity and windSpeed for a city
    getWeatherURL = darkskyURL + latitude + ',' + longitude
    console.log(chalk.blue(getWeatherURL))
    request({ url: getWeatherURL, json: true }, (error, {body}) => {
        console.log(body)
        // if(error) console.log('Problem connecting to Weather app')
        // else if (response.code) 
        //     console.log('Please correct the values')
        callback(error, {
            timezone: body.timezone,
            forecast: body.daily.summary
            ,
        })
    })
}

module.exports = {
    getWeather
}