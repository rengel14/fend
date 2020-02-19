const formHandler = require('./formHandler')

test('Testing post data for known article', () => {
    return formHandler('http://localhost:8081/eval', {url : 'https://en.wiktionary.org/wiki/static'}).then(data => {
        expect(result).toEqual({
            polarity: 'negative',
            subjectivity: 'objective',
            text: 'England were ponderous with ball in hand, their runners static when taking the ball and their lines obvious, while their front row struggled badly in the scrum.',
            polarity_confidence: 0.8626813292503357,
            subjectivity_confidence: 0.6663393120894435
        })
    })
})
