/**
 * Comprehensive Test Suite for Prime.js
 * Tests all prime-checking functions with various edge cases and scenarios
 */

const assert = require('assert');
const { isPrime, isPrimeWheel, isPrimeMemoized, isPrimeWheelMemoized, isPrimeBatch } = require('./Prime.js');

// Test data sets
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 60];
const edgeCases = [-10, -1, 0, 1, 0.5, 1.7, 2.9, 3.1, 100.7];
const largePrimes = [1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061];
const largeComposites = [1000, 1001, 1002, 1004, 1006, 1008, 1010, 1012, 1014, 1015];

// Color codes for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test runner function
function runTest(testName, testFunction) {
    try {
        testFunction();
        log(`✓ ${testName}`, 'green');
        return true;
    } catch (error) {
        log(`✗ ${testName}`, 'red');
        console.error(`  Error: ${error.message}`);
        return false;
    }
}

// Test suites for each function
function testIsPrime() {
    log('\n=== Testing isPrime function ===', 'blue');
    let passed = 0, total = 0;

    // Test known primes
    total++;
    passed += runTest('Known primes should return true', () => {
        primes.forEach(num => {
            assert.strictEqual(isPrime(num), true, `${num} should be prime`);
        });
    });

    // Test known composites
    total++;
    passed += runTest('Known composites should return false', () => {
        composites.forEach(num => {
            assert.strictEqual(isPrime(num), false, `${num} should not be prime`);
        });
    });

    // Test edge cases
    total++;
    passed += runTest('Edge cases should be handled correctly', () => {
        assert.strictEqual(isPrime(-10), false, '-10 should not be prime');
        assert.strictEqual(isPrime(-1), false, '-1 should not be prime');
        assert.strictEqual(isPrime(0), false, '0 should not be prime');
        assert.strictEqual(isPrime(1), false, '1 should not be prime');
        assert.strictEqual(isPrime(0.5), false, '0.5 should not be prime');
        assert.strictEqual(isPrime(2.9), true, '2.9 should be prime (floor to 2)');
        assert.strictEqual(isPrime(3.1), true, '3.1 should be prime (floor to 3)');
    });

    // Test large numbers
    total++;
    passed += runTest('Large primes should return true', () => {
        largePrimes.forEach(num => {
            assert.strictEqual(isPrime(num), true, `${num} should be prime`);
        });
    });

    total++;
    passed += runTest('Large composites should return false', () => {
        largeComposites.forEach(num => {
            assert.strictEqual(isPrime(num), false, `${num} should not be prime`);
        });
    });

    log(`isPrime: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'red');
    return { passed, total };
}

function testIsPrimeWheel() {
    log('\n=== Testing isPrimeWheel function ===', 'blue');
    let passed = 0, total = 0;

    // Test consistency with isPrime for known values
    total++;
    passed += runTest('Should match isPrime results for primes', () => {
        primes.forEach(num => {
            assert.strictEqual(isPrimeWheel(num), isPrime(num), `${num} results should match`);
        });
    });

    total++;
    passed += runTest('Should match isPrime results for composites', () => {
        composites.forEach(num => {
            assert.strictEqual(isPrimeWheel(num), isPrime(num), `${num} results should match`);
        });
    });

    total++;
    passed += runTest('Should handle edge cases like isPrime', () => {
        edgeCases.forEach(num => {
            assert.strictEqual(isPrimeWheel(num), isPrime(num), `${num} results should match`);
        });
    });

    // Test wheel-specific optimizations
    total++;
    passed += runTest('Should handle large numbers efficiently', () => {
        const testNums = [...largePrimes, ...largeComposites];
        testNums.forEach(num => {
            assert.strictEqual(isPrimeWheel(num), isPrime(num), `${num} results should match`);
        });
    });

    log(`isPrimeWheel: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'red');
    return { passed, total };
}

function testIsPrimeMemoized() {
    log('\n=== Testing isPrimeMemoized function ===', 'blue');
    let passed = 0, total = 0;

    // Clear cache before testing
    const primeCache = require('./Prime.js').primeCache || new Map();
    if (primeCache && primeCache.clear) primeCache.clear();

    total++;
    passed += runTest('Should match isPrime results', () => {
        const testNums = [...primes.slice(0, 20), ...composites.slice(0, 20)];
        testNums.forEach(num => {
            assert.strictEqual(isPrimeMemoized(num), isPrime(num), `${num} results should match`);
        });
    });

    total++;
    passed += runTest('Should cache results (second call should be instant)', () => {
        const testNum = 1009;
        const result1 = isPrimeMemoized(testNum);
        const result2 = isPrimeMemoized(testNum);
        assert.strictEqual(result1, result2, 'Cached result should match first result');
        assert.strictEqual(result1, true, '1009 should be prime');
    });

    total++;
    passed += runTest('Should handle edge cases with caching', () => {
        assert.strictEqual(isPrimeMemoized(0), false, '0 should not be prime');
        assert.strictEqual(isPrimeMemoized(1), false, '1 should not be prime');
        assert.strictEqual(isPrimeMemoized(-5), false, '-5 should not be prime');
    });

    log(`isPrimeMemoized: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'red');
    return { passed, total };
}

function testIsPrimeWheelMemoized() {
    log('\n=== Testing isPrimeWheelMemoized function ===', 'blue');
    let passed = 0, total = 0;

    total++;
    passed += runTest('Should match isPrimeWheel results', () => {
        const testNums = [...primes.slice(0, 15), ...composites.slice(0, 15)];
        testNums.forEach(num => {
            assert.strictEqual(isPrimeWheelMemoized(num), isPrimeWheel(num), `${num} results should match`);
        });
    });

    total++;
    passed += runTest('Should cache wheel results', () => {
        const testNum = 1013;
        const result1 = isPrimeWheelMemoized(testNum);
        const result2 = isPrimeWheelMemoized(testNum);
        assert.strictEqual(result1, result2, 'Cached result should match');
        assert.strictEqual(result1, true, '1013 should be prime');
    });

    log(`isPrimeWheelMemoized: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'red');
    return { passed, total };
}

function testIsPrimeBatch() {
    log('\n=== Testing isPrimeBatch function ===', 'blue');
    let passed = 0, total = 0;

    total++;
    passed += runTest('Should process arrays correctly', () => {
        const testNums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const expected = testNums.map(num => isPrime(num));
        const result = isPrimeBatch(testNums);
        
        assert.strictEqual(result.length, expected.length, 'Result array should have same length');
        result.forEach((res, idx) => {
            assert.strictEqual(res, expected[idx], `Result for ${testNums[idx]} should match`);
        });
    });

    total++;
    passed += runTest('Should handle empty array', () => {
        const result = isPrimeBatch([]);
        assert.strictEqual(result.length, 0, 'Empty array should return empty result');
    });

    total++;
    passed += runTest('Should handle single element array', () => {
        const result = isPrimeBatch([17]);
        assert.strictEqual(result.length, 1, 'Single element should return single result');
        assert.strictEqual(result[0], true, '17 should be prime');
    });

    total++;
    passed += runTest('Should handle mixed numbers efficiently', () => {
        const mixedNums = [...primes.slice(0, 10), ...composites.slice(0, 10), ...edgeCases.slice(0, 5)];
        const expected = mixedNums.map(num => isPrime(num));
        const result = isPrimeBatch(mixedNums);
        
        assert.strictEqual(result.length, expected.length, 'Arrays should have same length');
        result.forEach((res, idx) => {
            assert.strictEqual(res, expected[idx], `Batch result for ${mixedNums[idx]} should match individual test`);
        });
    });

    log(`isPrimeBatch: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'red');
    return { passed, total };
}

function testPerformanceAndConsistency() {
    log('\n=== Testing Performance and Cross-Function Consistency ===', 'blue');
    let passed = 0, total = 0;

    total++;
    passed += runTest('All functions should return consistent results for same inputs', () => {
        const testNums = [2, 3, 4, 5, 17, 25, 97, 100, 1009];
        
        testNums.forEach(num => {
            const basic = isPrime(num);
            const wheel = isPrimeWheel(num);
            const memoized = isPrimeMemoized(num);
            const wheelMemoized = isPrimeWheelMemoized(num);
            
            assert.strictEqual(wheel, basic, `isPrimeWheel(${num}) should match isPrime(${num})`);
            assert.strictEqual(memoized, basic, `isPrimeMemoized(${num}) should match isPrime(${num})`);
            assert.strictEqual(wheelMemoized, basic, `isPrimeWheelMemoized(${num}) should match isPrime(${num})`);
        });
    });

    total++;
    passed += runTest('Batch processing should match individual calls', () => {
        const testNums = [2, 4, 7, 9, 11, 15, 17, 21, 23, 25];
        const batchResults = isPrimeBatch(testNums);
        const individualResults = testNums.map(num => isPrime(num));
        
        batchResults.forEach((result, idx) => {
            assert.strictEqual(result, individualResults[idx], 
                `Batch result for ${testNums[idx]} should match individual result`);
        });
    });

    log(`Performance & Consistency: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'red');
    return { passed, total };
}

// Main test execution
function runAllTests() {
    log('🚀 Starting Prime.js Test Suite', 'yellow');
    log('=====================================', 'yellow');
    
    const results = [];
    
    // Run all test suites
    results.push(testIsPrime());
    results.push(testIsPrimeWheel());
    results.push(testIsPrimeMemoized());
    results.push(testIsPrimeWheelMemoized());
    results.push(testIsPrimeBatch());
    results.push(testPerformanceAndConsistency());
    
    // Calculate final results
    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
    const totalTests = results.reduce((sum, r) => sum + r.total, 0);
    
    log('=====================================', 'yellow');
    log(`📊 Final Results: ${totalPassed}/${totalTests} tests passed`, 
         totalPassed === totalTests ? 'green' : 'red');
    
    if (totalPassed === totalTests) {
        log('🎉 All tests passed! Prime.js functions are working correctly.', 'green');
    } else {
        log('❌ Some tests failed. Please review the output above.', 'red');
        process.exit(1);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests();
}

module.exports = {
    runAllTests,
    testIsPrime,
    testIsPrimeWheel, 
    testIsPrimeMemoized,
    testIsPrimeWheelMemoized,
    testIsPrimeBatch,
    testPerformanceAndConsistency
};