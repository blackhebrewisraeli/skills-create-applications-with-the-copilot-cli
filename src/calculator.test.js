/**
 * Test suite for Node.js CLI Calculator
 * Tests all four basic arithmetic operations:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 */

const { execSync } = require('child_process');

describe('Calculator Operations', () => {
  const runCalculator = (num1, operation, num2) => {
    try {
      const result = execSync(`node src/calculator.js ${num1} ${operation} ${num2}`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      return result.trim();
    } catch (error) {
      return error.message;
    }
  };

  // Addition tests
  describe('Addition Operation', () => {
    test('should add two positive numbers', () => {
      const result = runCalculator(10, '+', 5);
      expect(result).toBe('10 + 5 = 15');
    });

    test('should add positive and negative numbers', () => {
      const result = runCalculator(10, '+', -3);
      expect(result).toBe('10 + -3 = 7');
    });

    test('should add two negative numbers', () => {
      const result = runCalculator(-5, '+', -3);
      expect(result).toBe('-5 + -3 = -8');
    });

    test('should add decimal numbers', () => {
      const result = runCalculator(5.5, '+', 2.5);
      expect(result).toBe('5.5 + 2.5 = 8');
    });

    test('should add zero', () => {
      const result = runCalculator(0, '+', 10);
      expect(result).toBe('0 + 10 = 10');
    });
  });

  // Subtraction tests
  describe('Subtraction Operation', () => {
    test('should subtract two positive numbers', () => {
      const result = runCalculator(20, '-', 8);
      expect(result).toBe('20 - 8 = 12');
    });

    test('should subtract negative number', () => {
      const result = runCalculator(10, '-', -5);
      expect(result).toBe('10 - -5 = 15');
    });

    test('should result in negative number', () => {
      const result = runCalculator(5, '-', 10);
      expect(result).toBe('5 - 10 = -5');
    });

    test('should subtract decimal numbers', () => {
      const result = runCalculator(10.5, '-', 2.3);
      expect(result).toContain('10.5 - 2.3 =');
    });

    test('should subtract zero', () => {
      const result = runCalculator(15, '-', 0);
      expect(result).toBe('15 - 0 = 15');
    });
  });

  // Multiplication tests
  describe('Multiplication Operation', () => {
    test('should multiply two positive numbers', () => {
      const result = runCalculator(6, '*', 7);
      expect(result).toBe('6 * 7 = 42');
    });

    test('should multiply by zero', () => {
      const result = runCalculator(100, '*', 0);
      expect(result).toBe('100 * 0 = 0');
    });

    test('should multiply negative numbers', () => {
      const result = runCalculator(-4, '*', -5);
      expect(result).toBe('-4 * -5 = 20');
    });

    test('should multiply positive and negative', () => {
      const result = runCalculator(3, '*', -4);
      expect(result).toBe('3 * -4 = -12');
    });

    test('should multiply decimal numbers', () => {
      const result = runCalculator(2.5, '*', 4);
      expect(result).toBe('2.5 * 4 = 10');
    });
  });

  // Division tests
  describe('Division Operation', () => {
    test('should divide two positive numbers', () => {
      const result = runCalculator(100, '/', 4);
      expect(result).toBe('100 / 4 = 25');
    });

    test('should divide resulting in decimal', () => {
      const result = runCalculator(10, '/', 3);
      expect(result).toContain('10 / 3 =');
    });

    test('should divide negative numbers', () => {
      const result = runCalculator(-20, '/', 4);
      expect(result).toBe('-20 / 4 = -5');
    });

    test('should divide two negative numbers', () => {
      const result = runCalculator(-16, '/', -2);
      expect(result).toBe('-16 / -2 = 8');
    });

    test('should handle division by one', () => {
      const result = runCalculator(42, '/', 1);
      expect(result).toBe('42 / 1 = 42');
    });

    test('should reject division by zero', () => {
      const result = runCalculator(100, '/', 0);
      expect(result).toContain('Error: Cannot divide by zero');
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    test('should reject invalid operation', () => {
      const result = runCalculator(5, '^', 2);
      expect(result).toContain('Error: Invalid operation');
    });

    test('should reject missing arguments', () => {
      try {
        execSync('node src/calculator.js 5 +', { stdio: 'pipe' });
      } catch (error) {
        expect(error.message).toContain('Usage');
      }
    });

    test('should reject non-numeric input', () => {
      const result = runCalculator('abc', '+', 5);
      expect(result).toContain('Error: Both arguments must be valid numbers');
    });
  });
});
