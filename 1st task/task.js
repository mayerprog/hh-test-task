const readline = require('readline').createInterface(process.stdin, process.stdout);

let count = 0

let n
let m
let s

let firstPack = []
let secondPack = []

let resumesInfo = new Object();

let maxResumes
let amountResumes


const sumResumes = (resumePack, acceptableAmount) => {
    let sum = 0
    let filteredPack = []
    amountResumes = 0

    for (let i = 0; i < resumePack.length; i++) {
        sum += resumePack[i]
        filteredPack.push(resumePack[i])
        amountResumes++
        if (sum > acceptableAmount) {
            sum -= resumePack[i]
            filteredPack.pop()
            amountResumes--
            break
        }
        if (sum === acceptableAmount) break
    }
    resumesInfo['interimSum'] = sum
    resumesInfo['resumes'] = filteredPack
}

const filterSecondPack = (secondPack, acceptableAmount, filteredSecondPack) => {
    let sum = 0

    for (let i = 0; i < secondPack.length; i++) {
        sum += secondPack[i]
        filteredSecondPack.push(secondPack[i])
        if (sum > acceptableAmount) {
            sum -= secondPack[i]
            filteredSecondPack.pop()
            break
        }
        if (sum === acceptableAmount) break
    }

    return filteredSecondPack
}


const findMaxResumes = (firstPack, secondPack, acceptableAmount) => {

    let filteredSecondPack = []

    sumResumes(firstPack, acceptableAmount)

    maxResumes = amountResumes

    filterSecondPack(secondPack, acceptableAmount, filteredSecondPack)

    for (let i = 0; i < filteredSecondPack.length; i++) {
        resumesInfo.resumes.unshift(filteredSecondPack[i])
        sumResumes(resumesInfo.resumes)

        while (resumesInfo.interimSum > acceptableAmount) {
            resumesInfo.resumes.pop()
            sumResumes(resumesInfo.resumes)
        }
        if (resumesInfo.interimSum <= acceptableAmount && amountResumes > maxResumes) {
            maxResumes = amountResumes
        }
    }
    console.log(maxResumes)
    return maxResumes
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
        if (count <= n)
            firstPack.push(parseInt(a))
        if (count <= m)
            secondPack.push(parseInt(b))
    }

    count += 1

    if (count > n && count > m) {
        findMaxResumes(firstPack, secondPack, s)
        readline.close();
    }
});

//РЕШЕНИЕ ПРОШЛО ПРОВЕРКУ