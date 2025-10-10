# 🔢 Prime Number Checker

## Purpose

This repository contains a **Prime Number Checker** web application - an interactive tool designed to determine whether a given positive integer is a prime number. The application demonstrates efficient prime number algorithms and provides a user-friendly interface for mathematical exploration.

![Prime Number Checker Demo](https://github.com/user-attachments/assets/010b84f4-d091-4d7b-9abe-3f8ff03a6721)

## What is a Prime Number?

A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. Examples include 2, 3, 5, 7, 11, 13, 17, 19, 23, etc.

## Features

### Web Interface (`index.html`)
- **Clean, responsive design** with Bootstrap 5 framework
- **Number input validation** (positive integers only)
- **Instant prime checking** with visual feedback
- **Color-coded results**: Green gradient for prime numbers, red gradient for non-prime numbers
- **Check history** - maintains a list of the last 10 numbers checked
- **Clear functionality** for input and history
- **Animated transitions** for enhanced user experience

### Prime Algorithm Library (`Prime.js`)
The application includes multiple optimized prime-checking algorithms:

1. **Basic Optimized Algorithm** (`isPrime`):
   - Handles edge cases with lookup tables
   - Uses 6k±1 optimization for efficient checking
   - Quick divisibility tests for small primes (2, 3, 5)

2. **Wheel Factorization** (`isPrimeWheel`):
   - Advanced optimization using wheel factorization
   - Skips multiples of 2, 3, and 5 systematically

3. **Memoized Versions** (`isPrimeMemoized`, `isPrimeWheelMemoized`):
   - Caches results to avoid redundant calculations
   - Significant performance improvement for repeated checks

4. **Batch Processing** (`isPrimeBatch`):
   - Vectorized approach for checking multiple numbers

5. **Performance Testing**:
   - Built-in benchmarking functions
   - Comparison between different algorithms

## Technical Specifications

- **Frontend**: HTML5, CSS3, Bootstrap 5.3.2, Vanilla JavaScript
- **Algorithms**: Multiple optimized prime-checking implementations
- **Performance**: Optimized for numbers up to large integers with √n complexity
- **Browser Support**: Modern browsers with ES6+ support
- **Responsive Design**: Mobile-friendly interface

## Usage

### Running the Application
1. Open `index.html` in a web browser, or
2. Serve it using a local HTTP server:
   ```bash
   python3 -m http.server 8080
   # Then navigate to http://localhost:8080
   ```

### Using the Prime Checker
1. Enter any positive integer in the input field
2. Click "Check Prime" or press Enter
3. View the result with explanation
4. Check your history of recent calculations
5. Use "Clear" to reset input or "Clear History" to reset history

### Examples
- **17** → "17 is PRIME! ✨" (17 is only divisible by 1 and itself)
- **15** → "15 is NOT prime ❌" (15 has divisors other than 1 and itself)

## Educational Value

This application serves as:
- **Mathematical learning tool** for understanding prime numbers
- **Algorithm demonstration** showing different optimization techniques
- **Web development example** showcasing modern HTML/CSS/JavaScript
- **Performance comparison** between different algorithmic approaches

## Files Structure

```
├── index.html          # Main web application interface
├── Prime.js            # Optimized prime-checking algorithms library  
└── README.md           # This documentation
```
