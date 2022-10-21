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
    let unfilteredObj = Object.fromEntries(regionsSquareData.entries())
    let filteredList = Object.values(unfilteredObj).map(element => element.filter((el) => el.length > 0))
    let dataObj = []
    for (let e = 0; e < filteredList.length; e++) {
        let maxArr = Math.max(...filteredList[e].map(a=>a.length))
        let square = maxArr * filteredList[e].length
        let allOnes = filteredList[e].flat().reduce((a, b) => a+b)
        let profitRatio = allOnes / square 
        dataObj.push([profitRatio, square])  
    }
    
    return dataObj
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
    console.log(findSquare(regionsSquareData))
}

let M = [[1, 1, 0, 0, 0],
         [0, 1, 0, 0, 1],
         [1, 0, 0, 1, 1],
         [0, 0, 0, 0, 0],
         [1, 1, 0, 0, 1]];

// let M = [[1, 1, 0],
//         [1, 0, 0],
//         [1, 0, 1]]

// let M = [
//     [1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1],
//     [1, 0, 1, 0, 1]
// ]
console.log(findRegion(M))