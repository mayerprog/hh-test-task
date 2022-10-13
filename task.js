const readline = require('readline').createInterface(process.stdin, process.stdout);

let count = 0

let n
let m
let s

let as = []
let bs = []


function f(as, bs) {
    console.log(as)
    console.log(bs)
}


readline.on('line', (line) => {
    if (count == 0) {
        [n, m, s] = line.split(' ')
        m = parseInt(m)
        n = parseInt(n)
        s = parseInt(s)
    }
    else {
        let [a, b] = line.split(' ')
        if(count <= n )
            as.push(parseInt(a))
        if(count <= m )
            bs.push(parseInt(b))
    }
    
    count += 1

    if (count > n && count > m) {
        f(as, bs)
        readline.close();
    }    
});
