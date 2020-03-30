const request = require('request')
const chalk = require('chalk')

let getCoordinatesURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicmF2aWJhc2tlciIsImEiOiJjazg1MDR6cXYwMXczM2ZsazNnaHVuOXp2In0.F24iibbUbRTyAWimXrjNDw'
const mapBoxBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const access_token = 'access_token=pk.eyJ1IjoicmF2aWJhc2tlciIsImEiOiJjazg1MDR6cXYwMXczM2ZsazNnaHVuOXp2In0.F24iibbUbRTyAWimXrjNDw'

const getGeoCode = (location, callback) => {
    url = mapBoxBaseURL + location + '.json?' + access_token
    console.log(chalk.green(url))
    request({ url, json: true }, (error, response) => {
        if (error) console.log('Error')
        //console.log(response.body)
        callback(error, {
            placeName: response.body.features[0].place_name,
            latitude: response.body.features[0].geometry.coordinates[1],
            longitude: response.body.features[0].geometry.coordinates[0]
        })

    })
}

module.exports = {
    getGeoCode
}