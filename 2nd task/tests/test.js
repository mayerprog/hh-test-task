const DFS = (M, i, j, ROW, COL, regionsData) => {

    if (i < 0 || j < 0 || i > (ROW - 1) || j > (COL - 1) || M[i][j] != 1) {
        return;
    }

    if (M[i][j] == 1) {

        regionsData[i].push(1)

        M[i][j] = 0;

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


const findSquare = (regionsSquareData) => {
    let maxArr
    let square
    let allOnes
    let profitRatio
    let unfilteredObj = Object.fromEntries(regionsSquareData.entries())
    let filteredList = Object.values(unfilteredObj).map(element => element.filter((el) => el.length > 0))
    // let dataObj = []
    let interimRatio = 0
    let result

    for (let e = 0; e < filteredList.length; e++) {
        maxArr = Math.max(...filteredList[e].map(a=>a.length))
        square = maxArr * filteredList[e].length
        allOnes = filteredList[e].flat().reduce((a, b) => a+b)
        profitRatio = allOnes / square 
        if (profitRatio > interimRatio) {
            interimRatio = profitRatio
            result = square
        }
        if (profitRatio === interimRatio && square > result) {
            result = square
        }

        // dataObj.push([profitRatio, square])  
    }
    return result
}

const findRegion = (M) => {
    let ROW = M.length
    let COL = M[0].length
    let count = 0
    let regionsData = new Array(ROW).fill([]).map(() => new Array())

    let regionsSquareData = new Map()

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (M[i][j] == 1) {
                count++;
                DFS(M, i, j, ROW, COL, regionsData);
                regionsSquareData.set(count, regionsData) 
                regionsData = regionsData.map(() => new Array())
            }
        }
    }
    findSquare(regionsSquareData)
}

// let M = [[1, 1, 0, 0, 0],
//          [0, 1, 0, 0, 1],
//          [1, 0, 0, 1, 1],
//          [0, 0, 0, 0, 0],
//          [1, 1, 0, 0, 1]];

let M = [[1, 1, 0],
        [1, 0, 0],
        [1, 0, 1]]

// let M = [
//     [1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1],
//     [1, 0, 1, 0, 1]
// ]

console.log(findRegion(M))