class SparseMatrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.elements = new Map(); // Using Map to store non-zero elements
    }

    // Set value at specific position
    set(row, col, value) {
        if (row < 0 || col < 0) {
            throw new Error('Invalid position: row and column must be non-negative');
        }
        if (row >= this.rows || col >= this.cols) {
            throw new Error(`Invalid position: indices (${row},${col}) out of bounds for matrix of size ${this.rows}x${this.cols}`);
        }
        if (value === 0) {
            this.elements.delete(`${row},${col}`);
        } else {
            this.elements.set(`${row},${col}`, value);
        }
    }

    // Get value at specific position
    get(row, col) {
        if (row < 0 || col < 0) {
            throw new Error('Invalid position: row and column must be non-negative');
        }
        if (row >= this.rows || col >= this.cols) {
            throw new Error(`Invalid position: indices (${row},${col}) out of bounds for matrix of size ${this.rows}x${this.cols}`);
        }
        return this.elements.get(`${row},${col}`) || 0;
    }

    // Add two sparse matrices
    add(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error('Matrix dimensions must match for addition');
        }

        const result = new SparseMatrix(this.rows, this.cols);

        // Add elements from this matrix
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(row, col, value);
        }

        // Add elements from the other matrix
        for (const [key, value] of matrix.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(row, col, result.get(row, col) + value);
        }

        return result;
    }

    // Subtract two sparse matrices
    subtract(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
            throw new Error('Matrix dimensions must match for subtraction');
        }

        const result = new SparseMatrix(this.rows, this.cols);

        // Add elements from this matrix
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(row, col, value);
        }

        // Subtract elements from the other matrix
        for (const [key, value] of matrix.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(row, col, result.get(row, col) - value);
        }

        return result;
    }

    // Multiply two sparse matrices
    multiply(matrix) {
        if (this.cols !== matrix.rows) {
            throw new Error('Number of columns in first matrix must match number of rows in second matrix');
        }

        const result = new SparseMatrix(this.rows, matrix.cols);
        const columnMap = new Map();

        // Create a map of column indices to their corresponding elements in the second matrix
        for (const [key, value] of matrix.elements) {
            const [row, col] = key.split(',').map(Number);
            if (!columnMap.has(row)) {
                columnMap.set(row, []);
            }
            columnMap.get(row).push([col, value]);
        }

        // For each non-zero element in this matrix
        for (const [key1, value1] of this.elements) {
            const [row1, col1] = key1.split(',').map(Number);
            
            // Get all elements in the second matrix that can multiply with this element
            const matchingElements = columnMap.get(col1) || [];
            for (const [col2, value2] of matchingElements) {
                const product = value1 * value2;
                const currentValue = result.get(row1, col2);
                result.set(row1, col2, currentValue + product);
            }
        }

        return result;
    }

    // Transpose the matrix
    transpose() {
        const result = new SparseMatrix(this.cols, this.rows);

        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(col, row, value);
        }

        return result;
    }

    // Load matrix from file content
    static fromFileContent(content) {
        const lines = content.trim().split('\n');
        const [rowsLine, colsLine, ...elementLines] = lines;
        
        const rows = parseInt(rowsLine.split('=')[1]);
        const cols = parseInt(colsLine.split('=')[1]);
        
        if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
            throw new Error('Invalid matrix dimensions');
        }
        
        const matrix = new SparseMatrix(rows, cols);
        
        for (const line of elementLines) {
            // Parse (row, col, value) format
            const match = line.match(/\((\d+),\s*(\d+),\s*(-?\d+)\)/);
            if (match) {
                const [, row, col, value] = match;
                const rowIndex = parseInt(row);
                const colIndex = parseInt(col);
                const valueInt = parseInt(value);
                if (valueInt === 0) {
                    continue;
                }
                if (rowIndex < 0 || rowIndex >= rows || colIndex < 0 || colIndex >= cols) {
                    console.warn(`Warning: Skipping element at position (${rowIndex},${colIndex}) as it is out of bounds for matrix of size ${rows}x${cols}`);
                    continue;
                }
                matrix.set(rowIndex, colIndex, valueInt);
            }
        }
        
        return matrix;
    }

    // Convert matrix to string representation
    toString() {
        let result = `rows=${this.rows}\ncols=${this.cols}\n`;
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result += `(${row}, ${col}, ${value})\n`;
        }
        return result.trim();
    }
}

module.exports = SparseMatrix;