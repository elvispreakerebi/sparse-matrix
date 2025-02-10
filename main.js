const fs = require('fs');
const path = require('path');
const SparseMatrix = require('./sparseMatrix');

function loadMatrixFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return SparseMatrix.fromFileContent(content);
}

function writeResultToFile(matrix, operation) {
    const resultPath = path.join('./results', `${operation}_result.txt`);
    const content = `${operation.toUpperCase()} Result:\n${matrix.toString()}`;
    fs.writeFileSync(resultPath, content);
    console.log(`${operation} result has been written to ${resultPath}`);
}

function main() {
    // Example usage with sample files
    const sampleDir = './sample_input_for_students';
    
    // Load matrices for addition and subtraction (same dimensions)
    const matrix1 = loadMatrixFromFile(path.join(sampleDir, 'easy_sample_02_1.txt')); // 3850x3969
    const matrix2 = loadMatrixFromFile(path.join(sampleDir, 'easy_sample_02_2.txt')); // 3850x3969

    // Load matrices for multiplication (compatible dimensions)
    const matrix3 = loadMatrixFromFile(path.join(sampleDir, 'easy_sample_02_2.txt')); // 3850x3969
    const matrix4 = loadMatrixFromFile(path.join(sampleDir, 'easy_sample_02_3.txt')); // 3969x3850

    console.log('Matrix 1:');
    console.log(matrix1.toString());
    console.log('\nMatrix 2:');
    console.log(matrix2.toString());

    // Demonstrate matrix operations
    console.log('\nMatrix Addition:');
    try {
        const sum = matrix1.add(matrix2);
        console.log(sum.toString());
        writeResultToFile(sum, 'addition');
        console.log('Matrix addition completed successfully!');
    } catch (error) {
        console.error('Addition error:', error.message);
    }

    console.log('\nMatrix Subtraction:');
    try {
        const difference = matrix1.subtract(matrix2);
        console.log(difference.toString());
        writeResultToFile(difference, 'subtraction');
        console.log('Matrix subtraction completed successfully!');
    } catch (error) {
        console.error('Subtraction error:', error.message);
    }

    console.log('\nMatrix Multiplication:');
    try {
        const product = matrix3.multiply(matrix4);
        console.log(product.toString());
        writeResultToFile(product, 'multiplication');
        console.log('Matrix multiplication completed successfully!');
    } catch (error) {
        console.error('Multiplication error:', error.message);
    }

    console.log('\nMatrix 1 Transpose:');
    const transposed = matrix1.transpose();
    console.log(transposed.toString());
    writeResultToFile(transposed, 'transpose');
    console.log('Matrix transposition completed successfully!');
}

main();