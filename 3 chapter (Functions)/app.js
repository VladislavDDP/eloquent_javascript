let journal = []

function addNote(events, squirrel) {
    journal.push({events, squirrel})
}

function calculateCorrelation([n00, n01, n10, n11]) {
    return (n00 * n11 - n01 * n10) 
    / Math.sqrt(((n00 + n01) * (n00 + n10) * (n10 + n11) * (n01 + n11)))
}

function getEvents() {
    let passEvents = []
    for (let element of journal) {
        for (let event of element.events) {
            if (!passEvents.includes(event)) {
                passEvents.push(event)
            }
        }
    }
    return passEvents
}

function createMatrix(event) {
    let matrix = [0, 0, 0, 0]
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0
        if (entry.events.includes(event)) index += 1
        if (entry.squirrel) index += 2
        matrix[index]++
    }
    console.log(calculateCorrelation(matrix))
}

addNote(['work', 'drink vodka', 'eat pizza'], true)
addNote(['have a rest', 'walking', 'eat apple'], false)
addNote(['work', 'walking', 'watch film'], false)
addNote(['relax', 'cycling', 'eat pizza'], false)
addNote(['work', 'cycling', 'eat pizza'], true)
addNote(['relax', 'drink vodka', 'watch film'], false)


// const events = getEvents()
// for (let event of events) {
//     console.log(`Event ${event}:`)
//     createMatrix(event)
// }



/* METHODS of ARRAYS and Strings */

function remove(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1))
}


String.prototype.title = function() {
    return this[0].toUpperCase().concat(this.slice(1))
}

console.log(String(6).padStart(5, '9'))

// update to camelCase
String.prototype.toCamelCase = function() {
    return this.split('_').map((word, position) => {
        if (!position) return word
        return word[0].toUpperCase().concat(word.slice(1))
    }).join('')
}

function max(...args) {
    let max = -Infinity
    for (let a of args) {
        a > max? max = a : 0
    }
    return max
}
const args = [1, 5, 3]
console.log(max(...args))


const obj2 = {x: '1', y: '2'}
let {x, y} = obj2
console.log(x)
console.log(y)


/* serialization with JSON
*  to JSON format -> JSON.stringify
*  from JSON format -> JSON.parse
*/
const myData = {name: 'Vlad', age: 19, hobbies: ['js', 'python']}
let str = JSON.stringify(myData)
console.log(str)
console.log(JSON.parse(str))


// tasks 
// 1
function range(start, end, step = start < end ? 1 : -1) {
    let array = []
    if (step > 0) for (let i = start; i <= end; i += step) array.push(i)
    else for (let i = start; i >= end; i += step) array.push(i)
    return array
}

function sum(array) { 
    return array.reduce((acc, element) => {
        acc += element
        return acc
    })
}

console.log(range(1, 10))
console.log(range(5, 2, -1))
console.log(sum(range(1, 10)))


// 2

function reverseArray(array) {
    let reversed = []
    for (let i of array) {
        reversed.unshift(i)
    }
    return reversed
}

function reverseArrayInPlace(array) {
    let reversed = []
    for (let i of array) {
        reversed.unshift(i)
    }
    Object.assign(array, {...reversed})
}

function reverseArrayInPlace2(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      let old = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = old;
    }
    return array;
  }

console.log(reverseArray(["A", "B", "C"]))
// → ["C", "B", "A"];
let arrayValue = ["A", "B", "C"]
reverseArrayInPlace(arrayValue)
console.log(arrayValue)

let arrayValue2 = ["A", "B", "C"]
reverseArrayInPlace(arrayValue2)
console.log(arrayValue2)


// array to list 
function arrayToList(array) {
    if (!array.length) return
    let head = {value: array[0], next: {}}
    let previous = head.next
    for (let i = 1; i < array.length; i++) {
        let new_node = previous
        new_node.value = array[i]
        new_node.next = {}
        i + 1 == array.length? new_node.next = null : new_node.next = {}
        previous = new_node.next
    }

    return head
}

// convert list to array
function listToArray(list) {
    let array = []
    let iterator = list
    while (iterator) {
        array.push(iterator.value)
        iterator = iterator.next
    }
    return array
}

// add new head
function prepend(element, list) {
    return {value: element, next: list}
}

// find element in the list
function nth(list, position) {
    let counter = 0
    let iterator = list

    while (iterator) {
        if (counter === position) {
            return iterator.value
        }
        iterator = iterator.next
        counter++
    }
    return
}

// find index of element
function rec_nth(list, position, counter = 0) {
    if (counter === position) return list.value
    if (!list.next) return
    counter++
    return rec_nth(list.next, position, counter)
}

// const valueToFind = 'nikita'
// let list = arrayToList(['vlad', 'bodya', 'kima']) 
// let new_list = prepend('nikita', list)
// console.log(new_list)

// let position = nth(new_list, valueToFind)
// console.log(position)

// let position_rec = rec_nth(new_list, valueToFind)
// console.log(position_rec)

console.log(arrayToList([10, 20]))
console.log(listToArray(arrayToList([10, 20, 30])))
console.log(prepend(10, prepend(20, null)))
console.log(nth(arrayToList([10, 20, 30]), 1))
console.log(rec_nth(arrayToList([10, 20, 30]), 1))


// deep equal function for comparing all properties

function getKeys(obj) {
    return Object.keys(obj)
}

function deepEqual(a, b) {
    if (!a || !b) return
    let keys = getKeys(a)
    for (let key of getKeys(b)) {
        if (!keys.includes(key)) keys.push(key)
    }
    for (let i of keys) {
        if (typeof a == 'object' && deepEqual(a[i], b[i])) { }
        else if (a[i] !== b[i]) return false
    }
    return true
}
console.log('DEEP COMPARING')

let obj = {here: {is: "an"}, object: 2}
console.log(deepEqual(obj, obj))
// → true
console.log(deepEqual(obj, {here: 1, object: 2}))
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}))
// → true
console.log(deepEqual(1, 1))