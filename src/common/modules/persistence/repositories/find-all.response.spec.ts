import { FindAllResponse } from './find-all.response';

describe('FindAllResponse', () => {
  describe('constructor', () => {
    it('should create an instance with data and total', () => {
      // Arrange
      const mockData = [{ id: 1 }, { id: 2 }];
      const mockTotal = 2;

      // Act
      const response = new FindAllResponse(mockData, mockTotal);

      // Assert
      expect(response).toBeDefined();
      expect(response.data).toBe(mockData);
      expect(response.total).toBe(mockTotal);
    });

    it('should create an instance with empty data array', () => {
      // Arrange
      const mockData: any[] = [];
      const mockTotal = 0;

      // Act
      const response = new FindAllResponse(mockData, mockTotal);

      // Assert
      expect(response).toBeDefined();
      expect(response.data).toEqual([]);
      expect(response.total).toBe(0);
    });

    it('should correctly assign properties', () => {
      // Arrange
      const mockData = [{ name: 'test' }];
      const mockTotal = 1;

      // Act
      const response = new FindAllResponse(mockData, mockTotal);

      // Assert
      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('total');
      expect(Array.isArray(response.data)).toBe(true);
    });
  });
});