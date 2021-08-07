const hungryRabbit = {
    type: 'hungry'
}

const smallKitty = {
    type: 'small'
}

function speak(line) {
    console.log(`Animal speaks: ${line}. Type: ${this.type}`)
}

// work with this context

speak.call(smallKitty, 'How are you doing?')

function normalize() {
    console.log(this.coords.map(element => element / this.length))
}

normalize.call({coords: [1, 2, 3, 4, 5], length: 5})

// creating proto of object

const protoRabbit = {
    type: 'Ordinary',
    speak: function(line) {
        console.log(`${this.type} rabbit speaks ${line}`)
    }
}

const killerRabbit = Object.create(protoRabbit)
killerRabbit.type = 'Army'
killerRabbit.speak('puf-puf!!!')

protoRabbit.speak('hello')


// OOP -> Classes

// before JS 2015 
// function Rabbit(type) {
//     this.type = type
// }

// Rabbit.prototype.speak = function(line = 'default') {
//     console.log(`${this.type} rabbit speaks ${line}`)
// }

// let weirdRabbit = new Rabbit('Weird')
// weirdRabbit.speak('stranger things')

// let ordinaryRabbit = new Rabbit('Funny')
// ordinaryRabbit.speak('funny things')

// after 2015

class Rabbit {
    constructor(type) {
        this.type = type
    }

    speak(line) {
        console.log(`${this.type} rabbit speaks ${line}`)
    }
}

let weirdRabbit = new Rabbit('Weird')
weirdRabbit.speak('stranger things')

let ordinaryRabbit = new Rabbit('Funny')
ordinaryRabbit.speak('funny things')

// overriding properties and methods

class Car {
    constructor(name = 'default', volume = 0) {
        this.name = name
        this.engineVolume = volume
    }

    drive() {
        console.log(`${this.name} car with ${this.engineVolume} volume of engine is driving`)
    }

    printAllProperties() {
        console.log(this.name)
        console.log(this.engineVolume)
    }
}

class SpecialTransport extends Car {
    constructor(specialisation = 'work') {
        super()
        this.specialisation = specialisation
    }
    
    printAllProperties() {
        super.printAllProperties()
        console.log(this.specialisation)
    }
}

const tractor = new SpecialTransport()
tractor.name = 'tractor'
tractor.drive()
tractor.printAllProperties()

// class map as a dictionary

const ages = new Map()

// set method for creating a pair: ket => value
ages.set('Vlad', 19)
ages.set('Lena', 19)
ages.set('Sweetty', 18)

// get method for getting value by key
console.log(`Vlad is ${ages.get('Vlad')} now`) 
console.log(`Lena is ${ages.get('Lena')} now`) 
console.log(`Sweety is ${ages.get('Sweetty')} now`) 

// check if map has value with key like ...
console.log(`Does we have John in the list? ${ages.has('John')}`)


// hasOwnProperty method

const obj = {
    x: 0,
    y: 0,
    method1() {
        console.log('method1')
    },

    method2() {
        console.log('method2')
    },

    method3() {
        console.log('method3')
    }
}
console.log(obj.hasOwnProperty('toString')) 
console.log(obj.hasOwnProperty('x')) 

// overriding methods with symbols

const toStringSymbol = Symbol('toString')
Array.prototype[toStringSymbol] = function() {
    return `${this.length} sm of coat`
}

console.log([1, 2, 3].toString())
console.log([1, 2, 3][toStringSymbol]())


// iterators

let iterator = 'ok'[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())


// class matrix

class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width
        this.height = height
        this.content = []

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y)
            }
        }
    }

    // ralization of iterator
    [Symbol.iterator]() {
        return new MatrixIterator(this)
    }

    get(x, y) {
        return this.content[y * this.width + x]
    }

    set(x, y, value) {
        this.content[y * this.width + x] = value
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0
        this.y = 0
        this.matrix = matrix
    }

    next() {
        if (this.y === this.matrix.height) return {'done': true}

        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        }
        
        this.x++

        if (this.x === this.matrix.width) {
            this.x = 0
            this.y++
        }

        return {value, 'done': false}
    }

}

// Matrix.prototype[Symbol.iterator] = function() {
//     return new MatrixIterator(this)
// }

let matrix = new Matrix(2, 2, (x, y) => `${x}, ${y}`)
for (let {x, y, value} of matrix) {
    console.log(x, y, value)
}



// getters and setters

class Temperature {
    constructor(celsious) {
        this.celsious = celsious
    }

    get fahrenheit() {
        return this.celsious * 1.8 + 32
    }

    set fahrenheit(value) {
        this.celsious = (value - 32) / 1.8
    }

    static fromFahrenheitToCelcious(value) {
        return new Temperature((value - 32) / 1.8)
    }
}

let temperature = new Temperature(22)
console.log(temperature.fahrenheit)

temperature.fahrenheit = 86
console.log(temperature.celsious)

// using static method
console.log(Temperature.fromFahrenheitToCelcious(100)) 


// inheritance

class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x)
            else return element(x, y)
        })
    }

    set(x, y, value) {
        super.set(x, y, value)
        if (x != y) {
            super.set(y, x, value)
        }
    }
}

let symmatrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`)
console.log(symmatrix.get(1, 2))


// instanceof

console.log(new SymmetricMatrix(3) instanceof Matrix)
console.log(new SymmetricMatrix(3) instanceof SymmetricMatrix)

console.log(new Matrix(3, 2) instanceof SymmetricMatrix)


// 1 task Vector

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    minus(other) {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

const vector = new Vector(1, 1)
const other_vector = new Vector(3, 3)

console.log(vector.plus(other_vector))
console.log(vector.minus(other_vector))
console.log(vector.length)

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5


// task 2 Groups
console.log('GROUPS')

class Group {
    constructor() {
        this.group = []
    }

    add(value) {
        if (!(value in this.group)) {
            this.group.push(value)
        }
    }

    delete(value) {
        const index = this.group.indexOf(value)
        if (index !== -1)
            this.group.splice(index, 1)
    }

    has(value) {
        return this.group.some(elem => elem === value)
    }
}

const group = new Group()
group.add(1)
group.add(3)

console.log(group.has(1))
console.log(group.has(2))
console.log(group.has(3))

group.delete(3)
group.delete(1)

group.group.forEach(element => {
    console.log(element)
})


// task 3


// task 4