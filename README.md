# Sparse Matrix Implementation in JavaScript

A high-performance sparse matrix implementation in JavaScript that efficiently handles large matrices with mostly zero elements. This implementation uses a Map data structure to store only non-zero elements, making it memory-efficient for sparse matrices.

## Features

- Memory-efficient storage of sparse matrices
- Basic matrix operations:
  - Addition
  - Subtraction
  - Multiplication
  - Transpose
- File I/O support for matrix loading
- Error handling for matrix operations
- Efficient computation for large sparse matrices

## Installation

1. Clone the repository
2. Ensure you have Node.js installed
3. No additional dependencies required

## Usage

### Loading Matrices from Files

The implementation supports loading matrices from text files with the following format:
```
rows=<number_of_rows>
cols=<number_of_columns>
(row_index, column_index, value)
(row_index, column_index, value)
...
```

Example:
```javascript
const SparseMatrix = require('./sparseMatrix');
const matrix = SparseMatrix.fromFileContent(fileContent);
```

### Matrix Operations

#### Addition
```javascript
const sum = matrix1.add(matrix2);
```

#### Subtraction
```javascript
const difference = matrix1.subtract(matrix2);
```

#### Multiplication
```javascript
const product = matrix1.multiply(matrix2);
```

#### Transpose
```javascript
const transposed = matrix1.transpose();
```

### Example Usage

```javascript
const fs = require('fs');
const path = require('path');
const SparseMatrix = require('./sparseMatrix');

// Load matrices from files
const matrix1 = loadMatrixFromFile('matrix1.txt');
const matrix2 = loadMatrixFromFile('matrix2.txt');

// Perform operations
const sum = matrix1.add(matrix2);
const product = matrix1.multiply(matrix2);

// Results are automatically saved to the results directory
// View results
console.log(sum.toString());
console.log(product.toString());
```

### Operation Results

All matrix operation results are automatically saved to separate files in the `results` directory:

- `results/addition_result.txt`: Contains the result of matrix addition operations
- `results/subtraction_result.txt`: Contains the result of matrix subtraction operations
- `results/multiplication_result.txt`: Contains the result of matrix multiplication operations
- `results/transpose_result.txt`: Contains the result of matrix transpose operations

Each result file follows the same format as input files:
```
rows=<number_of_rows>
cols=<number_of_columns>
(row_index, column_index, value)
(row_index, column_index, value)
...
```

## Implementation Details

### Data Structure

The sparse matrix is implemented using a Map data structure where:
- Keys are strings in the format "row,column"
- Values are the non-zero elements at those positions

### Performance Considerations

- Only non-zero elements are stored, saving memory for sparse matrices
- Matrix operations only iterate over non-zero elements
- Efficient lookup of elements using Map data structure

### Error Handling

The implementation includes robust error handling for:
- Matrix dimension mismatches
- Invalid indices
- Out-of-bounds access
- File format errors

## Sample Files

The project includes sample input files in the `sample_input_for_students` directory for testing different matrix operations:
- Addition/Subtraction: Files with matching dimensions
- Multiplication: Files with compatible dimensions
- Various matrix sizes and sparsity levels

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

This project is open source and available under the MIT License.