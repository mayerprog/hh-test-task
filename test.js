//задача посчитать количество шагов, если сумма элементов массива даст 10
//или пока не выйдет за пределы 10

let resumesInfo = new Map();
let sum = 0
let amountResumes = 0
let newPack = []

const packInSequence = (resumePack, acceptableAmount) => {

        for (let i = 0; i < resumePack.length; i++) {
            sum += resumePack[i]
            newPack.push(resumePack[i])
            amountResumes++
            if (sum > acceptableAmount) {
                sum -= resumePack[i]
                newPack.pop()
                amountResumes--
                break
            }
            if (sum === acceptableAmount) break
        }
        resumesInfo.set('amountResumes', amountResumes)
        resumesInfo.set('interimSum', sum)
        resumesInfo.set('resumes', newPack)

        return resumesInfo
}

console.log(packInSequence([ 1, 2, 3, 4 ], 11))