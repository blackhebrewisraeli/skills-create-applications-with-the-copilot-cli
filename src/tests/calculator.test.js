/**
 * Test suite for Node.js CLI Calculator
 * Tests all arithmetic operations:
 * Basic:
 * - Addition, Subtraction, Multiplication, Division
 * Advanced:
 * - Modulo, Exponentiation, Square Root
 */

const { execSync } = require('child_process');

describe('Calculator Operations', () => {
  const runCalculator = (arg1, operation, arg2) => {
    try {
      let cmd;
      if (operation === 'sqrt') {
        cmd = `node src/calculator.js sqrt '${arg1}'`;
      } else {
        cmd = `node src/calculator.js '${arg1}' '${operation}' '${arg2}'`;
      }
      const result = execSync(cmd, {
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
     const result = runCalculator(5, '&', 2);
      expect(result).toContain('Error: Invalid operation');
    });

    test('should reject missing arguments', () => {
      try {
       execSync('node src/calculator.js 5', { stdio: 'pipe' });
      } catch (error) {
       expect(error.message).toContain('Usage');
      }
    });

   test('should reject non-numeric input', () => {
      const result = runCalculator('abc', '+', 5);
      expect(result).toContain('Error: Both arguments must be valid numbers');
    });
  });

  // Modulo tests
  describe('Modulo Operation', () => {
    test('should calculate modulo of two positive numbers - example from image: 5 % 2', () => {
      const result = runCalculator(5, '%', 2);
      expect(result).toBe('5 % 2 = 1');
    });

    test('should calculate modulo with different values: 17 % 5', () => {
      const result = runCalculator(17, '%', 5);
      expect(result).toBe('17 % 5 = 2');
    });

    test('should calculate modulo with different values: 20 % 3', () => {
      const result = runCalculator(20, '%', 3);
      expect(result).toBe('20 % 3 = 2');
    });

    test('should handle modulo with negative numbers', () => {
      const result = runCalculator(-17, '%', 5);
      expect(result).toContain('-17 % 5 =');
    });

    test('should handle modulo with both negative numbers', () => {
      const result = runCalculator(-10, '%', -3);
      expect(result).toContain('-10 % -3 =');
    });

    test('should handle modulo by one', () => {
      const result = runCalculator(100, '%', 1);
      expect(result).toBe('100 % 1 = 0');
    });

    test('should reject modulo by zero', () => {
      const result = runCalculator(10, '%', 0);
      expect(result).toContain('Error: Cannot perform modulo with zero');
    });

    test('should handle modulo with decimal numbers', () => {
      const result = runCalculator(7.5, '%', 2);
      expect(result).toContain('7.5 % 2 =');
    });
  });

  // Exponentiation tests
  describe('Exponentiation Operation', () => {
    test('should raise to positive power - example from image: 2 ^ 3', () => {
      const result = runCalculator(2, '^', 3);
      expect(result).toBe('2 ^ 3 = 8');
    });

    test('should raise to large power: 2 ^ 8', () => {
      const result = runCalculator(2, '^', 8);
      expect(result).toBe('2 ^ 8 = 256');
    });

    test('should raise to power of zero', () => {
      const result = runCalculator(5, '^', 0);
      expect(result).toBe('5 ^ 0 = 1');
    });

    test('should raise to power of one', () => {
      const result = runCalculator(7, '^', 1);
      expect(result).toBe('7 ^ 1 = 7');
    });

    test('should raise to negative power', () => {
      const result = runCalculator(2, '^', -2);
      expect(result).toBe('2 ^ -2 = 0.25');
    });

    test('should calculate power of base 3', () => {
      const result = runCalculator(3, '^', 4);
      expect(result).toBe('3 ^ 4 = 81');
    });

    test('should calculate fractional power', () => {
      const result = runCalculator(4, '^', 0.5);
      expect(result).toBe('4 ^ 0.5 = 2');
    });

    test('should handle negative base with even power', () => {
      const result = runCalculator(-2, '^', 2);
      expect(result).toBe('-2 ^ 2 = 4');
    });

    test('should handle negative base with odd power', () => {
      const result = runCalculator(-3, '^', 3);
      expect(result).toBe('-3 ^ 3 = -27');
    });

    test('should handle large exponent', () => {
      const result = runCalculator(10, '^', 5);
      expect(result).toBe('10 ^ 5 = 100000');
    });
  });

  // Square root tests
  describe('Square Root Operation', () => {
    test('should calculate square root - example from image: sqrt(16)', () => {
      const result = runCalculator(16, 'sqrt');
      expect(result).toBe('sqrt(16) = 4');
    });

    test('should calculate square root of perfect square: sqrt(25)', () => {
      const result = runCalculator(25, 'sqrt');
      expect(result).toBe('sqrt(25) = 5');
    });

    test('should calculate square root of perfect square: sqrt(9)', () => {
      const result = runCalculator(9, 'sqrt');
      expect(result).toBe('sqrt(9) = 3');
    });

    test('should calculate square root of perfect square: sqrt(100)', () => {
      const result = runCalculator(100, 'sqrt');
      expect(result).toBe('sqrt(100) = 10');
    });

    test('should calculate square root of non-perfect square', () => {
      const result = runCalculator(2, 'sqrt');
      expect(result).toContain('sqrt(2) = 1.414');
    });

    test('should calculate square root of one', () => {
      const result = runCalculator(1, 'sqrt');
      expect(result).toBe('sqrt(1) = 1');
    });

    test('should calculate square root of zero', () => {
      const result = runCalculator(0, 'sqrt');
      expect(result).toBe('sqrt(0) = 0');
    });

    test('should reject square root of negative number - edge case', () => {
      const result = runCalculator(-4, 'sqrt');
      expect(result).toContain('Error: Cannot calculate square root of negative number');
    });

    test('should reject square root of large negative number', () => {
      const result = runCalculator(-100, 'sqrt');
      expect(result).toContain('Error: Cannot calculate square root of negative number');
    });

    test('should calculate square root of decimal number', () => {
      const result = runCalculator(4.84, 'sqrt');
      expect(result).toContain('sqrt(4.84) = 2.2');
    });

    test('should calculate square root of very small positive number', () => {
      const result = runCalculator(0.25, 'sqrt');
      expect(result).toBe('sqrt(0.25) = 0.5');
    });

    test('should calculate square root of large number', () => {
      const result = runCalculator(10000, 'sqrt');
      expect(result).toBe('sqrt(10000) = 100');
    });
  });
});