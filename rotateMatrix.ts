
function createMatrix(n: number) {
    const result = [];

    for (let i = 0; i < n; i++) {
        result.push(new Array(n));
    }      

    return result;
}

function subMatrixOf(matrix: number[][], dim: number): number[][] {
    const newMatrix = createMatrix(dim);

    for (let row = 0; row < dim; row++) {
        for (let column = 0; column < dim; column++) {
            newMatrix[row][column] = matrix[row][column];
        }
    }

    return newMatrix;
}

function mergeMatrices(rotated: number[][], matrix: number[][]): number[][] {
    const dim = matrix.length;
    const result = createMatrix(dim);

    /**
    * input matrix
    * [ x1 x2 x3 ]
    * [ x4 x5 x6 ]
    * [ x7 x8 x9 ]
    * 
    * rotated subMatrix
    * [ x4 x1 ]
    * [ x5 x2 ]
    */

    /**
     * 
     * [ null  x4    x1 ]
     * [ null  x5    x2 ]
     * [ null null  null]
     * 
     * */

    //cpy rotated
    for (let row = 0; row < result.length; row++) {
        for (let col = 0; col < result.length; col++) {
            if(col > 0 && row < dim - 1) {
                result[row][col] = rotated[row][col - 1];
            }
        }
    }

    /**
     * 
     * [ x7  x4   x1  ]
     * [ x8  x5   x2  ]
     * [ x9 null null ]
     * 
     * */

    //cpy first column
    for (let row = 0; row < dim; row++) {
        const lastRow = matrix[dim - 1];
        result[row][0] = lastRow[row];
    }

    /**
     * 
     * [ x7 x4 x1 ]
     * [ x8 x5 x2 ]
     * [ x9 x6 x3 ]
     * 
     * */

    // cpy last row
    for (let col = 0; col < dim; col++) {
        result[dim - 1][col] = matrix[dim - 1 - col][dim - 1];
    }
    

    return result;
}

export function rotateMatrix(matrix: number[][]): number[][] {
    const dim = matrix.length;

    if(dim === 1) return matrix;

    if(dim === 2) {
        const result = createMatrix(2);
        result[0][0] = matrix[1][0]; 
        result[0][1] = matrix[0][0]; 
        result[1][0] = matrix[1][1]; 
        result[1][1] = matrix[0][1]; 
        return result;
    }

    const rotatedSubMatrix = rotateMatrix(subMatrixOf(matrix, dim - 1));

    const merged = mergeMatrices(rotatedSubMatrix, matrix);

    return merged;
}

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

function printMatrix(matrix: number[][]) {
    matrix.forEach(row => {
        console.log(row);
    });
}

printMatrix(rotateMatrix(matrix));
