import { ResponseDto } from '@common/dto/response.dto';
import AntaresException from '@common/exceptions/antares.exception';
import { BadRequestException } from '@nestjs/common';
import { CrudController } from './crud.controller';
import Result from './result/result.util';

describe('CrudController', () => {
  // Happy Path Tests
  describe('response method - Success scenarios', () => {
    it('should return ResponseDto when Result.ok is provided with a string value', () => {
      // Arrange
      const testValue = 'test string';
      const testValueExpected = 'test string';
      const result = Result.ok(testValue);

      // Act
      const response = CrudController.response(result);

      // Assert
      expect(response).toBeInstanceOf(ResponseDto);
      expect(response.value).toBe(testValueExpected);
    });

    it('should return ResponseDto when Result.ok is provided with a number value', () => {
      // Arrange
      const testValue = 123;
      const testValueExpected = 123;
      const result = Result.ok(testValue);

      // Act
      const response = CrudController.response(result);

      // Assert
      expect(response.value).toBe(testValueExpected);
    });

    it('should handle falsy values correctly in Result.ok', () => {
      // Arrange
      const falsyValues = [0, '', false, null];
      const result0 = Result.ok(falsyValues[0]);
      const result1 = Result.ok(falsyValues[1]);
      const result2 = Result.ok(falsyValues[2]);
      const result3 = Result.ok(falsyValues[3]);
      const falsyValuesExpected = [0, '', false, null];

      // Act
      const response0 = CrudController.response(result0);
      const response1 = CrudController.response(result1);
      const response2 = CrudController.response(result2);
      const response3 = CrudController.response(result3);

      // Assert
      expect(response0.value).toBe(falsyValuesExpected[0]);
      expect(response1.value).toBe(falsyValuesExpected[1]);
      expect(response2.value).toBe(falsyValuesExpected[2]);
      expect(response3.value).toBe(falsyValuesExpected[3]);
    });

    it('should handle complex objects in Result.ok', () => {
      // Arrange
      const testObject = { id: 1, name: 'test' };
      const testObjectExpected = { id: 1, name: 'test' };
      const result = Result.ok(testObject);

      // Act
      const response = CrudController.response(result);

      // Assert
      expect(response.value).toEqual(testObjectExpected);
    });
  });

  // Unhappy Path Tests
  describe('response method - Error scenarios', () => {
    it('should throw BadRequestException when Result.err is provided', () => {
      // Arrange
      const errorMessage = 'Test error message';
      const error = new AntaresException(errorMessage);
      const result = Result.err(error);

      // Act & Assert
      expect(() => {
        CrudController.response(result);
      }).toThrow(BadRequestException);
    });

    it('should throw BadRequestException with correct error message', () => {
      // Arrange
      const errorMessage = 'Specific error message';
      const errorMessageExpected = 'Specific error message';
      const error = new AntaresException(errorMessage);
      const result = Result.err(error);

      // Act & Assert
      expect(() => {
        CrudController.response(result);
      }).toThrow(errorMessageExpected);
    });

    it('should handle empty error message in Result.err', () => {
      // Arrange
      const error = new AntaresException('');
      const result = Result.err(error);

      // Act & Assert
      expect(() => {
        CrudController.response(result);
      }).toThrow(BadRequestException);
    });
  });

  // Edge Cases
  describe('response method - Edge cases', () => {
    it('should throw when null is passed as argument', () => {
      // Arrange & Act & Assert
      expect(() => {
        CrudController.response(null as any);
      }).toThrow();
    });

    it('should throw when undefined is passed as argument', () => {
      // Arrange & Act & Assert
      expect(() => {
        CrudController.response(undefined as any);
      }).toThrow();
    });

    it('should handle Result.ok with undefined value', () => {
      // Arrange
      const result = Result.ok(undefined);

      // Act
      const response = CrudController.response(result);

      // Assert
      expect(response.value).toBeUndefined();
    });

    it('should handle array values in Result.ok', () => {
      // Arrange
      const testArray = [1, 2, 3];
      const testArrayExpected = [1, 2, 3];
      const result = Result.ok(testArray);

      // Act
      const response = CrudController.response(result);

      // Assert
      expect(response.value).toEqual(testArrayExpected);
    });
  });
});
