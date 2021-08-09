'use strict'

function canYouSpotTheProblem() {
    // 'use strict'
    for (let counter = 0; counter < 5; counter++) {
        console.log('Super')
    }
}

canYouSpotTheProblem()

function Person(name) {
    this.name = name
}

let person = new Person('Melon')
console.log(person.name)

// writing tests for funtion

function test(text, func) {
    if (!func()) {
        console.log(`Problem with test: ${text}`)
    }
    else {
        console.log(`Test '${text}' was passed!`)
    }
}

test('to upper case testing', () => {
    return 'hello' === 'HELLO'.toLowerCase()
})

test('to lower case testing', () => {
    return 'HELLO' === 'hello'.toUpperCase()
})

// convert number to string in base-metrical system 
function numberToString(n, base = 10) {
    let result = '', sign = ''
    if (n < 0) {
        sign = '-'
        n = -n
    }
    do {
        result = String(n % base) + result
        n = Math.floor(n / base)
        console.log(n)
    } while(n > 0)
    return sign + result
}

console.log(numberToString(13, 2)) 