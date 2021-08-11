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


// try catch
class WrongDirection extends Error {}

function changeDirection(question) {
    let direction = prompt('Enter direction: ')
    if (!direction) throw new Error()
    if (direction.toLowerCase() == 'l') return 'left'
    else if (direction.toLowerCase() == 'r') return 'right'
    else throw new WrongDirection(`Wrong diretion ${direction}! Try again...`) 
}

function look() {
    if (changeDirection('Where are we going?') == 'left')
        console.log('Home')
    else console.log('Three wolfes')
}

try {
    for(;;) {
        try {
            // look()
            break
        } catch(error) {
            if (error instanceof WrongDirection) console.log(error)
            else throw error
        }
    }
} catch(e) {
    console.log(e)
}

// task 1

class RandError extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2)  return a * b 
    else throw new RandError('You are not a lucky person...')
}

for(;;) {
    try {
        console.log(primitiveMultiply(3, 4)) 
        break
    } catch(e) {
        if (e instanceof RandError) console.log(e)
        else throw e
    }
}


// task 2

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
  function withBoxUnlocked(body) {
    if (!box.locked) return body()

    box.unlock()
    try {
        return body()
    } finally {
        box.lock()
    }
  }
  
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });
  
  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised: " + e);
  }
  
  console.log(box.locked);