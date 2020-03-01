import "regenerator-runtime/runtime"
const GetWeather = require('./server')

test('Testing weather data for known location', () => {
    const enteredDate = new Date('2022-03-01').getTime() / 1000
    let temp = new Date();
    const day = String(temp.getDate()).padStart(2, '0');
    const month = String(temp.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = temp.getFullYear();
    temp = year + '-' + month + '-' + day;
    const today = new Date(temp).getTime() / 1000
    const time = Math.floor(Math.abs(enteredDate - today) / 86400)

    return GetWeather({lon: -65.99998, lat: 18.4103}, '2022-03-01')
    .then(data => {
        expect(data).toEqual({
            loc: '',
            high: 83.27,
            low: 72.35,
            summary: 'Partly cloudy throughout the day.',
            time: time,
            pic: ''
        })
    })
})