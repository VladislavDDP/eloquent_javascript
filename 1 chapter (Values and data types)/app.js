// print triangle from sharps
for (let char = '#'; char.length < 7; char += '#') {
    console.log(char)
}

// my try for print FizzBuzz
FizzBuzz = () => {
    for (let i = 1; i < 101; i++) {
        if (!(i % 3) && !(i % 5)) {
            console.log('FizzBazz')
        } else if (!(i % 3)) {
            console.log('Fizz')
        } else if (!(i % 5)) {
            console.log('Buzz')
        } else {
            console.log(i)
        }
    }
}

FizzBuzz()

// good solution 
for (let i = 1; i < 101; i++) {
    let final = ''
    if (!(i % 3)) final += 'Fizz'
    if (!(i % 5)) final += 'Baz'
    console.log(final || i)
}


// chess board
const start = new Date().getTime()
const size = 10
for (let i = 1; i < size + 1; i++) {
    let str = ''
    for (let j = 1; j <  size + 1; j++) {
        if (i % 2) {
            if (j % 2)
                str += ' '
            else str += '#'
        } else {
            if (!(j % 2))
                str += ' '
            else str += '#'
        }
    }
    console.log(str)
}
const end = new Date().getTime()

// one more variant
let strategy = true
let str = ''
for (let i = 1; i < size * size + 1; i++) {
    if (strategy) {
        (i % 2) ? str += ' ' : str += '#'
    } else {
        !(i % 2) ? str += ' ' : str += '#'
    }
    if (!(i % size)) {
        strategy ? strategy = false : strategy = true
        console.log(str)
        str = ''
    }
}

console.log(`${end - start}`)
