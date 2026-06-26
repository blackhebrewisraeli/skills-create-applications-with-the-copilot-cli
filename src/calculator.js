#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supports four basic arithmetic operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (×)
 * - Division (÷)
 */

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('Usage: calculator <number1> <operation> <number2>');
  console.error('Operations: +, -, *, /');
  console.error('Example: calculator 10 + 5');
  process.exit(1);
}

const num1 = parseFloat(args[0]);
const operation = args[1];
const num2 = parseFloat(args[2]);

if (isNaN(num1) || isNaN(num2)) {
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
  default:
    console.error('Error: Invalid operation. Use +, -, *, or /');
    process.exit(1);
}

console.log(`${num1} ${operation} ${num2} = ${result}`);
