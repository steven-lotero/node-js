const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f612e1634f43e991ef8b8ee485b3b4f&query='+latitude+','+longitude+'&'
    request({url, json: true},(error, {body} = {})=>{
        if (error){
            callback('Unable to connect forecast service', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            const {temperature, feelslike, humidity} = body.current
            callback(undefined, 'It is currently '+temperature+ ' degress out. it feels like '+ feelslike + ' degress out and humidity ' + humidity)
        }
    })
}

module.exports = forecast