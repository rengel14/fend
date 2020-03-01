import "regenerator-runtime/runtime"
const PostTest = require('./app')

test('Testing post data for known location', () => {
    const enteredDate = new Date('2022-03-01').getTime() / 1000
    let temp = new Date();
    const day = String(temp.getDate()).padStart(2, '0');
    const month = String(temp.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = temp.getFullYear();
    temp = year + '-' + month + '-' + day;
    const today = new Date(temp).getTime() / 1000
    const time = Math.floor(Math.abs(enteredDate - today) / 86400)

    return PostTest('http://localhost:3000/save', {loc: 'san juan puerto rico', date: '2022-03-01'})
    .then(data => {
        expect(data).toEqual({
            loc: 'san juan puerto rico',
            high: 83.27,
            low: 72.35,
            summary: 'Partly cloudy throughout the day.',
            time: time,
            pic: 'https://pixabay.com/get/5fe6d3424256b108f5d084609629327a143cd8ec554c704c7d2c7bdd954cc259_640.jpg'
        })
    })
})
