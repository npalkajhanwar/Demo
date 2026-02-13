/**
 * Comprehensive Test Suite for Factorial.js
 * Tests all factorial calculation functions with various edge cases and scenarios
 */

const assert = require('assert');
const { factorial, factorialRecursive, factorialMemoized, factorialBatch } = require('./Factorial.js');

// Test data sets
const smallNumbers = [0, 1, 2, 3, 4, 5];
const expectedSmall = [1, 1, 2, 6, 24, 120];
const mediumNumbers = [6, 7, 8, 9, 10];
const expectedMedium = [720, 5040, 40320, 362880, 3628800];
const edgeCases = [0.5, 1.7, 2.9, 3.1];
const expectedEdge = [1, 1, 2, 6]; // Floored values

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
function testFactorial() {
    log('\n=== Testing factorial function ===', 'blue');
    let passed = 0, total = 0;

    // Test small numbers
    total++;
    passed += runTest('Small numbers should calculate correctly', () => {
        smallNumbers.forEach((num, idx) => {
            assert.strictEqual(factorial(num), expectedSmall[idx], 
                `factorial(${num}) should equal ${expectedSmall[idx]}`);
        });
    });

    // Test medium numbers
    total++;
    passed += runTest('Medium numbers should calculate correctly', () => {
        mediumNumbers.forEach((num, idx) => {
            assert.strictEqual(factorial(num), expectedMedium[idx], 
                `factorial(${num}) should equal ${expectedMedium[idx]}`);
        });
    });

    // Test edge cases (floored decimals)
    total++;
    passed += runTest('Decimal numbers should be floored', () => {
        edgeCases.forEach((num, idx) => {
            assert.strictEqual(factorial(num), expectedEdge[idx], 
                `factorial(${num}) should equal ${expectedEdge[idx]} (floored to ${Math.floor(num)})`);
        });
    });

    // Test negative numbers
    total++;
    passed += runTest('Negative numbers should throw error', () => {
        assert.throws(() => factorial(-1), Error, 'Should throw error for negative numbers');
        assert.throws(() => factorial(-5), Error, 'Should throw error for negative numbers');
    });

    // Test zero
    total++;
    passed += runTest('Zero factorial should equal 1', () => {
        assert.strictEqual(factorial(0), 1, '0! should equal 1');
    });

    // Test one
    total++;
    passed += runTest('One factorial should equal 1', () => {
        assert.strictEqual(factorial(1), 1, '1! should equal 1');
    });

    log(`\nPassed: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

function testFactorialRecursive() {
    log('\n=== Testing factorialRecursive function ===', 'blue');
    let passed = 0, total = 0;

    // Test small numbers
    total++;
    passed += runTest('Small numbers should calculate correctly (recursive)', () => {
        smallNumbers.forEach((num, idx) => {
            assert.strictEqual(factorialRecursive(num), expectedSmall[idx], 
                `factorialRecursive(${num}) should equal ${expectedSmall[idx]}`);
        });
    });

    // Test medium numbers
    total++;
    passed += runTest('Medium numbers should calculate correctly (recursive)', () => {
        mediumNumbers.forEach((num, idx) => {
            assert.strictEqual(factorialRecursive(num), expectedMedium[idx], 
                `factorialRecursive(${num}) should equal ${expectedMedium[idx]}`);
        });
    });

    // Test negative numbers
    total++;
    passed += runTest('Negative numbers should throw error (recursive)', () => {
        assert.throws(() => factorialRecursive(-1), Error);
        assert.throws(() => factorialRecursive(-10), Error);
    });

    log(`\nPassed: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

function testFactorialMemoized() {
    log('\n=== Testing factorialMemoized function ===', 'blue');
    let passed = 0, total = 0;

    // Test small numbers
    total++;
    passed += runTest('Small numbers should calculate correctly (memoized)', () => {
        smallNumbers.forEach((num, idx) => {
            assert.strictEqual(factorialMemoized(num), expectedSmall[idx], 
                `factorialMemoized(${num}) should equal ${expectedSmall[idx]}`);
        });
    });

    // Test medium numbers
    total++;
    passed += runTest('Medium numbers should calculate correctly (memoized)', () => {
        mediumNumbers.forEach((num, idx) => {
            assert.strictEqual(factorialMemoized(num), expectedMedium[idx], 
                `factorialMemoized(${num}) should equal ${expectedMedium[idx]}`);
        });
    });

    // Test cache hits (call same numbers again)
    total++;
    passed += runTest('Cached values should return same results', () => {
        smallNumbers.forEach((num, idx) => {
            assert.strictEqual(factorialMemoized(num), expectedSmall[idx], 
                `factorialMemoized(${num}) cached should equal ${expectedSmall[idx]}`);
        });
    });

    // Test negative numbers
    total++;
    passed += runTest('Negative numbers should throw error (memoized)', () => {
        assert.throws(() => factorialMemoized(-1), Error);
    });

    log(`\nPassed: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

function testFactorialBatch() {
    log('\n=== Testing factorialBatch function ===', 'blue');
    let passed = 0, total = 0;

    // Test batch processing
    total++;
    passed += runTest('Batch processing should work correctly', () => {
        const results = factorialBatch(smallNumbers);
        assert.deepStrictEqual(results, expectedSmall, 
            'Batch results should match expected values');
    });

    // Test empty array
    total++;
    passed += runTest('Empty array should return empty array', () => {
        const results = factorialBatch([]);
        assert.deepStrictEqual(results, [], 'Empty array should return empty array');
    });

    // Test single element
    total++;
    passed += runTest('Single element array should work', () => {
        const results = factorialBatch([5]);
        assert.deepStrictEqual(results, [120], 'Single element should work correctly');
    });

    log(`\nPassed: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

function testConsistency() {
    log('\n=== Testing consistency across implementations ===', 'blue');
    let passed = 0, total = 0;

    // Test that all implementations give same results
    total++;
    passed += runTest('All implementations should give same results', () => {
        const testNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        testNumbers.forEach(num => {
            const result1 = factorial(num);
            const result2 = factorialRecursive(num);
            const result3 = factorialMemoized(num);
            assert.strictEqual(result1, result2, 
                `factorial and factorialRecursive should match for ${num}`);
            assert.strictEqual(result1, result3, 
                `factorial and factorialMemoized should match for ${num}`);
        });
    });

    log(`\nPassed: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

// Run all tests
function runAllTests() {
    log('\n' + '='.repeat(50), 'yellow');
    log('FACTORIAL.JS TEST SUITE', 'yellow');
    log('='.repeat(50), 'yellow');

    const results = [
        testFactorial(),
        testFactorialRecursive(),
        testFactorialMemoized(),
        testFactorialBatch(),
        testConsistency()
    ];

    const totalPassed = results.filter(r => r).length;
    const totalTests = results.length;

    log('\n' + '='.repeat(50), 'yellow');
    log(`FINAL RESULTS: ${totalPassed}/${totalTests} test suites passed`, 
        totalPassed === totalTests ? 'green' : 'red');
    log('='.repeat(50), 'yellow');

    process.exit(totalPassed === totalTests ? 0 : 1);
}

// Run tests
runAllTests();
