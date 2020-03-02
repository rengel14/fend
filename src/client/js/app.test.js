import "regenerator-runtime/runtime"
const AppTest = require('./app')

test('Testing client app function', () => {
    const result = AppTest('This is a test')
    return expect(result).toEqual("This+is+a+test")
})
