function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
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
    
function dominantDirection(text) {
    let writingDirections = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : null;
    }).filter(direction => direction.name !== null);
    
    if (!writingDirections.length) {
        return null;
    }
    else {
        const {name: dominantDirection} = writingDirections.reduce((dominantDirection, writingDirection) => {
            return (writingDirection.count > dominantDirection.count) ? writingDirection : dominantDirection;
        });
        return dominantDirection;
    }
}
    
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
console.log(dominantDirection("Strangers, مساء الخير"));
// → ltr
console.log(dominantDirection(""));