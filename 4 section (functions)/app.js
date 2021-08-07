function repeat(n, func) {
    for (let i = 0; i < n; i++) {
        func(i)
    }
}

function unless(test, then) {
    if (test) then()
}


repeat(3, n => {
    unless(n % 2 == 0, () => {
        console.log(`Четное число: ${n}`)
    })
})


integers = [1, 2, 3, 4, 5]
console.log(integers)
integers.forEach((element, index) => {
    return integers[index] = element * element
})
console.log(integers)


function filter(array, action) {
    let filtered = []
    for (let element of array) {
        if (action(element)) filtered.push(element) 
    }
    return filtered
}

function map(array, transf) {
    let mapped = []
    for (let element of array) {
        mapped.push(transf(element))
    }
    return mapped
}

function reduce(array, func, start) {
    let current = start
    for (let el of array) {
        current = func(current, el)
    }
    return current
}

console.log(map(filter(SCRIPTS, script => script.living), element => element.name))
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0))


function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from)
    }, 0)
}

console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a 
}))


function average(array) {
    return array.reduce((a, b) => a + b) / array.length
}

console.log(Math.round(average(SCRIPTS
    .filter(element => element.living)
    .map(element => element.year))))

console.log(Math.round(average(SCRIPTS
    .filter(element => !element.living)
    .map(element => element.year))))


// define the font
console.log(characterScript(121))


// tasks
// 1 concatenate subarrays into a big one
arr = [[1, 2, 3], [2, 4], [3, 8]]
console.log(arr.reduce((a, b) => {
    return a.concat(b)
}, []))

// 2 own loop
function loop(value, condition, update, func) {
    for (let i = value; condition(i); i = update(i))
        func(i)
}


loop(1, i => i < 5, i => ++i, console.log)
loop(3, n => n > 0, n => n - 1, console.log)

// 3 every function

function every(array, pred) {
    for (let element of array) {
        if (!pred(element))
            return false
    }
    return true
}

function every_real(array, pred) {
    return array.every(element => pred(element))
}

console.log(every([1, 3, 5], n => n < 10))
console.log(every([2, 4, 16], n => n < 10))
console.log(every([], n => n < 10))


// 4 

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to
        })) {
            return script
        }
    }
    return null
}

function countBy(items, groupName) {
    let counts = []
    for (let item of items) {
        let name = groupName(item)
        let known = counts.findIndex(c => c.name == name)
        if (known == -1) counts.push({name, count: 1})
        else counts[known].count++
    }
    return counts
}

function textScripts(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.name : 'none'
    }).filter(({name}) => name !== 'none')

    let total = scripts.reduce((n, {count}) => n + count, 0)
    if (!total) return 'No scripts found'

    return scripts.map(({name, count}) => {
        return `${Math.round(count / total)}, ${name}`
    })
}


function dominantDirection(text) {
    let directions = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.direction : null
    }).filter((direction) => direction.name !== null)

    if (directions.length == 0) return 'ltr'

    return directions.reduce((a, b) => (a.count > b.count) ? a : b).name
}

console.log(dominantDirection("Hello!"));
// // → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
