This Repository is Just for Demo purpose
It contains HTML and Javascript code

## Prime Number Checker

This demo includes optimized prime number checking algorithms with a comprehensive test suite.

## Factorial Calculator

This demo also includes factorial calculation functions with multiple implementation approaches.

### Files:
- `Prime.js` - Multiple optimized prime checking functions
- `Prime.test.js` - Comprehensive test suite with 20 test cases  
- `Factorial.js` - Factorial calculation functions (iterative, recursive, memoized)
- `Factorial.test.js` - Comprehensive test suite for factorial functions
- `index.html` - Interactive web interface for prime checking
- `TEST_GUIDE.md` - Detailed testing documentation

### Usage:
```bash
# Run prime tests
npm test

# Run prime demo  
npm run demo

# Run factorial tests
npm run test:factorial

# Run factorial demo
npm run demo:factorial
```

### Prime Functions Available:
- `isPrime(num)` - Basic optimized checker
- `isPrimeWheel(num)` - Wheel factorization method
- `isPrimeMemoized(num)` - Memoized version
- `isPrimeWheelMemoized(num)` - Memoized wheel version  
- `isPrimeBatch(numbers[])` - Batch processing

### Factorial Functions Available:
- `factorial(num)` - Basic iterative factorial calculation
- `factorialRecursive(num)` - Recursive implementation
- `factorialMemoized(num)` - Memoized version for performance
- `factorialBatch(numbers[])` - Batch processing for multiple numbers
