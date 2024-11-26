import AntaresException from '@common/exceptions/antares.exception';
import Result from './result.util';

describe('Result', () => {
  // Happy Path Tests
  describe('Result.ok', () => {
    it('should create a successful result with a string value', () => {
      // Arrange
      const value = 'test value';
      const valueExpected = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result.isErr).toBe(false);
      expect(result.value).toBe(valueExpected);
      expect(result.error).toBeNull();
    });

    it('should handle different value types correctly', () => {
      // Arrange
      const numberValue = 42;
      const numberValueExpected = 42;
      const objectValue = { key: 'value' };
      const objectValueExpected = { key: 'value' };
      const arrayValue = [1, 2, 3];
      const arrayValueExpected = [1, 2, 3];

      // Act
      const numberResult = Result.ok(numberValue);
      const objectResult = Result.ok(objectValue);
      const arrayResult = Result.ok(arrayValue);

      // Assert
      expect(numberResult.value).toBe(numberValueExpected);
      expect(objectResult.value).toMatchObject(objectValueExpected);
      expect(arrayResult.value).toMatchObject(arrayValueExpected);
    });

    it('should handle falsy values correctly', () => {
      // Arrange
      const falsyValues = [0, '', false, null, undefined];

      // Act & Assert
      falsyValues.forEach((value) => {
        const result = Result.ok(value);
        expect(result.isOk).toBe(true);
        expect(result.value).toBe(value);
      });
    });
  });

  // Unhappy Path Tests
  describe('Result.err', () => {
    it('should create an error result with AntaresException', () => {
      // Arrange
      const errorMessage = 'Test error';
      const errorMessageExpected = 'Test error';
      const error = new AntaresException(errorMessage);

      // Act
      const result = Result.err<string>(error);

      // Assert
      expect(result.isOk).toBe(false);
      expect(result.isErr).toBe(true);
      expect(result.error).toBe(error);
      expect(result.error.message).toBe(errorMessageExpected);
      expect(result.value).toBeNull();
    });

    it('should maintain different error instances separately', () => {
      // Arrange
      const error1 = new AntaresException('Error 1');
      const error1Expected = 'Error 1';
      const error2 = new AntaresException('Error 2');
      const error2Expected = 'Error 2';

      // Act
      const result1 = Result.err<string>(error1);
      const result2 = Result.err<string>(error2);

      // Assert
      expect(result1.error.message).toBe(error1Expected);
      expect(result2.error.message).toBe(error2Expected);
      expect(result1.error).not.toBe(result2.error);
    });
  });

  // Type Safety Tests
  describe('Generic Type Safety', () => {
    it('should maintain type safety for different generic types', () => {
      // Arrange & Act
      const stringResult = Result.ok<string>('string');
      const numberResult = Result.ok<number>(42);
      const objectResult = Result.ok<{ prop: string }>({ prop: 'value' });

      // Assert
      expect(typeof stringResult.value).toBe('string');
      expect(typeof numberResult.value).toBe('number');
      expect(typeof objectResult.value).toBe('object');
    });
  });
});
