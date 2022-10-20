let firstPack = []
let secondPack = []

let resumesInfo = new Object();

let maxResumes
let amountResumes = 0

let filteredSecondPack = []


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

const filterSecondPack = (secondPack, acceptableAmount) => {
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

    sumResumes(firstPack, acceptableAmount)
    maxResumes = amountResumes

    filterSecondPack(secondPack, acceptableAmount)

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


findMaxResumes([ 4, 2, 4, 6, 1, 7 ], [ 2, 1, 8, 5 ], 10)