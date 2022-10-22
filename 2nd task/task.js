const readline = require('readline').createInterface(process.stdin, process.stdout);

let count = 0
let array = []
let grid = []

const DFS = (M, i, j, ROW, COL, regionsData) => {

    if (i < 0 || j < 0 || i > (ROW - 1) || j > (COL - 1) || M[i][j] != 1) {
        return;
    }

    if (M[i][j] == 1) {

        regionsData.push([i, j])

        M[i][j] = -1;

        DFS(M, i + 1, j, ROW, COL, regionsData);     //right side traversal
        DFS(M, i - 1, j, ROW, COL, regionsData);     //left side traversal
        DFS(M, i, j + 1, ROW, COL, regionsData);     //upward side traversal
        DFS(M, i, j - 1, ROW, COL, regionsData);     //downward side traversal
        DFS(M, i + 1, j + 1, ROW, COL, regionsData); //upward-right side traversal
        DFS(M, i - 1, j - 1, ROW, COL, regionsData); //downward-left side traversal
        DFS(M, i + 1, j - 1, ROW, COL, regionsData); //downward-right side traversal
        DFS(M, i - 1, j + 1, ROW, COL, regionsData); //upward-left side traversal

    }
}


const findSquare = (regionsSquareData, M) => {
    let Arr_i
    let minArr_i
    let maxArr_i
    let Arr_j
    let minArr_j 
    let maxArr_j
    let onesSum
    let square
    let profitRatio
    let interimRatio = 0
    let result = 0

    for (let e = 0; e < regionsSquareData.length; e++) {
        Arr_i = regionsSquareData[e].map(n => n[0])
        Arr_j = regionsSquareData[e].map(n => n[1])
        maxArr_i = Math.max(...Arr_i)
        minArr_i = Math.min(...Arr_i)
        maxArr_j = Math.max(...Arr_j)
        minArr_j = Math.min(...Arr_j)

        square = (maxArr_i - minArr_i + 1) * (maxArr_j - minArr_j + 1)

        // onesSum = regionsSquareData[e].length
        onesSum = 0
        for (let i = minArr_i; i <= maxArr_i; i++) {
            for (let j = minArr_j; j <= maxArr_j; j++) {
                onesSum -= M[i][j]
            }
        }

        if (onesSum === 1) continue

        profitRatio = onesSum / square 

        if (profitRatio > interimRatio) {
            interimRatio = profitRatio
            result = square
        }
        if (profitRatio === interimRatio && square > result) {
            result = square
        }
    Arr_i = 0
    Arr_j = 0
    }

    return result
}

const findRegion = (M) => {
    let ROW = M.length
    let COL = M[0].length
    let regionsData = []
    let regionsSquareData = []

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (M[i][j] == 1) {
                DFS(M, i, j, ROW, COL, regionsData);
                regionsSquareData.push(regionsData)
                regionsData = []
            }
        }
    }
//    console.log(regionsSquareData)
    return findSquare(regionsSquareData, M)
}


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
        console.log(findRegion(grid))
        readline.close();
    }
});

//