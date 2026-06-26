#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supports basic and advanced arithmetic operations:
 * Basic:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (×)
 * - Division (÷)
 * Advanced:
 * - Modulo (%)
 * - Exponentiation (^)
 * - Square Root (sqrt)
 */

// Helper functions for advanced operations

/**
 * Calculates the remainder of a divided by b
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Remainder
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot perform modulo with zero');
  }
  return a % b;
}

/**
 * Raises base to the power of exponent
 * @param {number} base - Base number
 * @param {number} exponent - Exponent
 * @returns {number} Result of base^exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Calculates the square root of a number
 * @param {number} n - Number to calculate square root for
 * @returns {number} Square root of n
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(n);
}

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: calculator <number1> <operation> [number2]');
  console.error('Operations: +, -, *, /, %, ^, sqrt');
  console.error('Examples:');
  console.error('  calculator 10 + 5');
  console.error('  calculator 17 % 5');
  console.error('  calculator 2 ^ 8');
  console.error('  calculator sqrt 16');
  process.exit(1);
}

// Handle sqrt operation (single operand)
if (args[0] === 'sqrt') {
  const num = parseFloat(args[1]);
  if (isNaN(num)) {
    console.error('Error: Argument must be a valid number');
    process.exit(1);
  }
  
  try {
    const result = squareRoot(num);
    console.log(`sqrt(${num}) = ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
  process.exit(0);
}

const num1 = parseFloat(args[0]);
const operation = args[1];
const num2 = args[2] ? parseFloat(args[2]) : null;

// All other operations require two operands
if (num2 === null || isNaN(num1) || isNaN(num2)) {
  console.error('Error: Both arguments must be valid numbers');
  process.exit(1);
}

let result;

switch (operation) {
  case '+':
    // Addition operation
    result = num1 + num2;
    break;
  case '-':
    // Subtraction operation
    result = num1 - num2;
    break;
  case '*':
    // Multiplication operation
    result = num1 * num2;
    break;
  case '/':
    // Division operation with zero check
    if (num2 === 0) {
      console.error('Error: Cannot divide by zero');
      process.exit(1);
    }
    result = num1 / num2;
    break;
  case '%':
    // Modulo operation
    try {
      result = modulo(num1, num2);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    break;
  case '^':
    // Exponentiation operation
    result = power(num1, num2);
    break;
  default:
    console.error('Error: Invalid operation. Use +, -, *, /, %, ^, or sqrt');
    process.exit(1);
}

console.log(`${num1} ${operation} ${num2} = ${result}`);
