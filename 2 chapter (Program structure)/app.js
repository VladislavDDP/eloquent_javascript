// recursion 

function findSolution(target) {
    function find(current, history) {
        if (current === target) return history
        else if (current > target) return null
        else {
            return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`)
        }
    }
    return find(1, '1') 
}

console.log(findSolution(79)) 

function validateNumber(number, qty) {
    number = number.toString()
    while (number.length < qty)
        number = '0' + number
    return number
}

function printCowsAndChickens(cows, chickens, pigs) {
    console.log(validateNumber(cows, 3) + ' коров')
    console.log(validateNumber(chickens, 3) + ' цыплят')
    console.log(validateNumber(pigs, 3) + ' свиньи')
}

printCowsAndChickens(40, 5, 34)

// min function 

function getMin(a, b) {
    return a < b ? a : b
}

console.log(getMin(5, 3))


// isEven recursion function

function isEven(number) {
    if (number < 0) return isEven(-number)
    else if (number == 0) return true
    else if (number == 1) return false 
    return isEven(number - 2)
}
console.log('---RECURSION---')
console.log(isEven(75))
console.log(isEven(50))
console.log(isEven(-1))

function countB(string) {
    return countChar(string, 'B')
}

function countChar(string, char) {
    const arr = string.split('')
    return arr.reduce((acc, elem) => {
        if (elem == char) acc++
        return acc
    }, 0)
}

console.log(countB("BBC"));
console.log(countChar("kakkerlak", "k"));