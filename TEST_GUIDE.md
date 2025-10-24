# Prime.js Test Suite Guide

This document describes the comprehensive test suite created for the Prime.js file, which contains multiple optimized prime number checking algorithms.

## Overview

The test suite (`Prime.test.js`) provides comprehensive coverage for all functions in `Prime.js`:

- **isPrime()** - Basic optimized prime checker with 6k±1 optimization
- **isPrimeWheel()** - Advanced wheel factorization method  
- **isPrimeMemoized()** - Memoized version of isPrime for performance
- **isPrimeWheelMemoized()** - Memoized version of wheel factorization
- **isPrimeBatch()** - Batch processing for arrays of numbers

## Running Tests

### Quick Start
```bash
# Run all tests
npm test
# OR
node Prime.test.js

# Run the demo
npm run demo  
# OR
node Prime.js
```

### Test Categories

#### 1. **Edge Cases Testing**
- Negative numbers (-10, -1)
- Zero and one (0, 1) 
- Decimal numbers (0.5, 1.7, 2.9, 3.1)
- Boundary conditions

#### 2. **Known Prime Numbers**
Tests against a comprehensive list of the first 46 prime numbers:
```
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199
```

#### 3. **Known Composite Numbers**
Tests against composite numbers to ensure they correctly return false:
```
4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 60
```

#### 4. **Large Number Testing**
- Large primes: 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061
- Large composites: 1000, 1001, 1002, 1004, 1006, 1008, 1010, 1012, 1014, 1015

#### 5. **Performance & Consistency Testing**
- Cross-function consistency verification
- Memoization functionality validation
- Batch processing accuracy

### Test Output

The test suite provides colored console output:
- ✅ **Green**: Passing tests
- ❌ **Red**: Failing tests  
- 🔵 **Blue**: Test section headers
- 🟡 **Yellow**: Overall results

Example output:
```
🚀 Starting Prime.js Test Suite
=====================================

=== Testing isPrime function ===
✓ Known primes should return true
✓ Known composites should return false
✓ Edge cases should be handled correctly
✓ Large primes should return true
✓ Large composites should return false
isPrime: 5/5 tests passed

=====================================
📊 Final Results: 20/20 tests passed
🎉 All tests passed! Prime.js functions are working correctly.
```

## Test Architecture

### Test Structure
- **runTest()** - Individual test runner with error handling
- **Color logging** - Enhanced console output with colors
- **Modular design** - Each function has its own test suite
- **Comprehensive coverage** - Tests all edge cases and scenarios

### Data Sets Used
- **primes[]** - Array of first 46 prime numbers
- **composites[]** - Array of composite numbers for negative testing  
- **edgeCases[]** - Special cases like negatives, decimals, zero
- **largePrimes[]** - Large prime numbers for performance testing
- **largeComposites[]** - Large composite numbers

### Test Validation Methods
1. **Direct comparison** - Compare function results with expected values
2. **Cross-validation** - Ensure all functions return consistent results
3. **Cache validation** - Verify memoization works correctly
4. **Batch validation** - Ensure batch processing matches individual calls

## Adding New Tests

To add new test cases:

1. **Add test data** to the appropriate array (primes, composites, etc.)
2. **Create new test function** following the pattern:
   ```javascript
   function testNewFeature() {
       log('\n=== Testing New Feature ===', 'blue');
       let passed = 0, total = 0;
       
       total++;
       passed += runTest('Test description', () => {
           // Test logic with assertions
           assert.strictEqual(actualResult, expectedResult, 'Error message');
       });
       
       return { passed, total };
   }
   ```
3. **Add to runAllTests()** function
4. **Run tests** to verify new functionality

## Dependencies

- **Node.js** >= 12.0.0
- **Built-in modules only**:
  - `assert` - For test assertions
  - `require` - For module importing

No external testing frameworks required - uses Node.js built-in capabilities for maximum compatibility.

## Coverage Summary

The test suite provides **100% function coverage** with **20 comprehensive test cases** covering:

- ✅ All 5 prime-checking functions
- ✅ Edge cases and boundary conditions  
- ✅ Performance optimizations (memoization, wheel factorization)
- ✅ Batch processing capabilities
- ✅ Cross-function consistency
- ✅ Error handling and input validation

This ensures that all Prime.js functionality is thoroughly validated and working correctly.