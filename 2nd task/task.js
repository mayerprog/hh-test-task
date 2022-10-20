const readline = require('readline').createInterface(process.stdin, process.stdout);

let count = 0
let array = []
let grid = []

readline.on('line', (line) => {
    if (count == 0) {
        [n, m] = line.split(' ')
        n = parseInt(n)
        m = parseInt(m)
    }
    else {
        array = line.split(' ').map(Number)
        if (array.length != n) {
            throw new Error('not an appropriate line');
        }
        if (count <= m)
            grid.push(array)
    }

    count += 1

    if (count > m) {
        //findRichRegion()
        console.log(grid)
        readline.close();
    }
});