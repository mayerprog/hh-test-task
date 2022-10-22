
let arr = [
    [ [ 1, 1, 1, 1 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 0 ] ],
    [ [ 1, 1, 1 ], [ 1, 4 ], [ 2, 4 ], [ 2, 3 ] ],
    [ [ 1, 1 ], [ 4, 0 ], [ 4, 1 ] ],
    [ [ 1 ], [ 4, 4 ] ]
  ]

  const max = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let maxArr = arr[i].slice(1).map(n => Math.max(...n))
        return Math.max(...maxArr)
    }
  }


console.log(max(arr))

