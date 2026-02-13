
/**
 * Calculates the factorial of a non-negative integer.
 * Factorial of n (n!) is the product of all positive integers less than or equal to n.
 * For example: 5! = 5 × 4 × 3 × 2 × 1 = 120
 *
 * @param {number} num - The non-negative integer to calculate factorial for.
 * @returns {number} The factorial of the input number.
 * @throws {Error} If the input is negative or not an integer.
 */
function factorial(num) {
    // Convert to integer
    num = Math.floor(num);
    
    // Handle negative numbers
    if (num < 0) {
        throw new Error('Factorial is not defined for negative numbers');
    }
    
    // Base cases
    if (num === 0 || num === 1) {
        return 1;
    }
    
    // Calculate factorial iteratively
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    
    return result;
}

/**
 * Calculates factorial recursively.
 * Alternative implementation using recursion.
 *
 * @param {number} num - The non-negative integer to calculate factorial for.
 * @returns {number} The factorial of the input number.
 * @throws {Error} If the input is negative or not an integer.
 */
function factorialRecursive(num) {
    // Convert to integer
    num = Math.floor(num);
    
    // Handle negative numbers
    if (num < 0) {
        throw new Error('Factorial is not defined for negative numbers');
    }
    
    // Base cases
    if (num === 0 || num === 1) {
        return 1;
    }
    
    // Recursive case
    return num * factorialRecursive(num - 1);
}

const factorialCache = new Map();
/**
 * Calculates factorial with memoization to cache results.
 * Utilizes a cache to avoid redundant factorial calculations for previously evaluated numbers.
 *
 * @param {number} num - The non-negative integer to calculate factorial for.
 * @returns {number} The factorial of the input number.
 * @throws {Error} If the input is negative or not an integer.
 */
function factorialMemoized(num) {
    // Convert to integer
    num = Math.floor(num);
    
    // Handle negative numbers
    if (num < 0) {
        throw new Error('Factorial is not defined for negative numbers');
    }
    
    // Check cache
    if (factorialCache.has(num)) {
        return factorialCache.get(num);
    }
    
    // Base cases
    if (num === 0 || num === 1) {
        factorialCache.set(num, 1);
        return 1;
    }
    
    // Calculate factorial iteratively
    let result = 1;
    for (let i = 2; i <= num; i++) {
        if (factorialCache.has(i)) {
            result = factorialCache.get(i);
        } else {
            result *= i;
            factorialCache.set(i, result);
        }
    }
    
    return result;
}

/**
 * Batch factorial calculation for arrays.
 * @param {number[]} numbers - Array of numbers to calculate factorial for.
 * @returns {number[]} - Array of factorial results.
 */
function factorialBatch(numbers) {
    return numbers.map(num => factorial(num));
}

// Example usage
console.log("Factorial Calculator:");
console.log(`5! = ${factorial(5)}`);     // 120
console.log(`10! = ${factorial(10)}`);   // 3628800
console.log(`0! = ${factorial(0)}`);     // 1

// Export functions
module.exports = { factorial, factorialRecursive, factorialMemoized, factorialBatch };
