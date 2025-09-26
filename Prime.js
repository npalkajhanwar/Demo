
function isPrime(num) {
    // Convert to integer and handle edge cases
    num = Math.floor(num)
    
    // Handle small numbers with lookup table (fastest for common cases)
    if (num < 2) return false
    if (num < 4) return true;  // 2, 3 are prime
    if (num < 6) return num === 5;  // 4 is not prime, 5 is prime
    if (num < 8) return num === 7;  // 6 is not prime, 7 is prime
    if (num < 12) return num === 11;  // 8,9,10 not prime, 11 is prime
    
    // Quick divisibility checks for small primes
    if (num % 2 === 0 || num % 3 === 0 || num % 5 === 0) return false;
    
    // Optimized 6k±1 check with reduced operations
    const limit = Math.sqrt(num);
    for (let i = 7; i <= limit; i += 6) {
        if (num % i === 0 || num % (i + 4) === 0) {
            return false;
        }
    }
    
    return true;
}



function isPrimeWheel(num) {
    num = Math.floor(num);
    
    // Handle small primes directly
    const smallPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
    if (num <= 31) return smallPrimes.includes(num);
    
    // Quick divisibility for wheel base
    if (num % 2 === 0 || num % 3 === 0 || num % 5 === 0) return false;
    
    // 2,3,5-wheel: check candidates of form 30k + {1,7,11,13,17,19,23,29}
    const wheel = [4, 6, 10, 12, 16, 18, 22, 24]; // gaps between candidates
    const limit = Math.sqrt(num);
    let candidate = 7;
    let wheelIndex = 1;
    
    while (candidate <= limit) {
        if (num % candidate === 0) return false;
        candidate += wheel[wheelIndex];
        wheelIndex = (wheelIndex + 1) % 8;
    }
    
    return true;
}

const primeCache = new Map();
/**
 * Checks if a number is prime using memoization to cache results.
 * Utilizes a cache to avoid redundant prime checks for previously evaluated numbers.
 *
 * @param {number} num - The number to check for primality.
 * @returns {boolean} True if the number is prime, false otherwise.
 */
function isPrimeMemoized(num) {
    if (primeCache.has(num)) {
        return primeCache.get(num);
    }
    
    const result = isPrime(num);
    if (num > 1) {
        primeCache.set(num, result);
    }
    return result;
}

const primeWheelCache = new Map();
/**
 * Checks if a number is prime using wheel factorization and memoization.
 * Utilizes a cache to avoid redundant wheel-based prime checks for previously evaluated numbers.
 *
 * @param {number} num - The number to check for primality.
 * @returns {boolean} True if the number is prime, false otherwise.
 */
function isPrimeWheelMemoized(num) {
    if (primeWheelCache.has(num)) {
        return primeWheelCache.get(num);
    }
    const result = isPrimeWheel(num);
    if (num > 1) {
        primeWheelCache.set(num, result);
    }
    return result;
}
/**
 * Batch prime checking for arrays (vectorized approach)
 * @param {number[]} numbers - Array of numbers to check
 * @returns {boolean[]} - Array of boolean results
 */
function isPrimeBatch(numbers) {
    return numbers.map(num => isPrime(num));
}

// Example usage and performance comparison
console.log("Optimized Prime Checker:");
console.log(`2 is prime: ${isPrime(2)}`);     // true
console.log(`97 is prime: ${isPrime(97)}`);   // true
console.log(`1009 is prime: ${isPrime(1009)}`); // true

// Performance test function
function performanceTest() {
    const testNumbers = Array.from({length: 1000}, (_, i) => Math.floor(Math.random() * 10000));
    
    console.time('Original isPrime');
    testNumbers.forEach(num => isPrime(num));
    console.timeEnd('Original isPrime');
    
    console.time('Wheel isPrime');
    testNumbers.forEach(num => isPrimeWheel(num));
    console.timeEnd('Wheel isPrime');
    
    console.time('Memoized isPrime');
    testNumbers.forEach(num => isPrimeMemoized(num));
    console.timeEnd('Memoized isPrime');
}

// Uncomment to run performance test
// performanceTest();
// Export optimized functions
module.exports = { isPrime, isPrimeWheel, isPrimeMemoized, isPrimeWheelMemoized, isPrimeBatch };
