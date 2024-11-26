import Result from '@common/utils/result/result.util';
import { Customers } from '@entities/projects-management/customers.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NewCustomerDto } from '@projects-management/dto/new-customer.dto';
import { UpdateCustomerDto } from '@projects-management/dto/update-customer.dto';
import { CustomersService } from '@projects-management/services/customers.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { CustomersController } from './customers.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: jest.Mocked<CustomersService>;

  const mockCustomer = new Customers();
  mockCustomer.customerId = 'test-id';
  mockCustomer.name = 'Test Customer';
  mockCustomer.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getReport: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get(CustomersService);
  });

  describe('findAll', () => {
    it('should return paginated customers list', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockCustomer], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search');

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        { status: 'DESC', createdAt: 'ASC' },
        ['name'],
        'search',
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('getReport', () => {
    it('should return customer report', async () => {
      // Arrange
      const mockReportData = [mockCustomer];
      service.getReport.mockResolvedValue(Result.ok(mockReportData));

      // Act
      const result = await controller.getReport();

      // Assert
      expect(service.getReport).toHaveBeenCalled();
      expect(result.value).toEqual(mockReportData);
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockCustomer));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('customerId', id);
      expect(result.value).toEqual(mockCustomer);
    });
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      // Arrange
      const dto: NewCustomerDto = {
        name: 'New Customer',
      };
      service.create.mockResolvedValue(Result.ok(mockCustomer));

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          customerId: 'mock-ulid',
          name: dto.name,
        }),
      );
      expect(result.value).toEqual(mockCustomer);
    });
  });

  describe('update', () => {
    it('should update existing customer', async () => {
      // Arrange
      const dto: UpdateCustomerDto = {
        name: 'Updated Customer',
        status: false,
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockCustomer));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'customerId',
        id,
        expect.objectContaining({
          name: dto.name,
          status: dto.status,
        }),
      );
      expect(result.value).toEqual(mockCustomer);
    });

    it('should handle partial updates', async () => {
      // Arrange
      const dto: UpdateCustomerDto = {
        name: 'Updated Customer',
      };
      const id = 'test-id';
      service.update.mockResolvedValue(Result.ok(mockCustomer));

      // Act
      const result = await controller.update(dto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'customerId',
        id,
        expect.objectContaining({
          name: dto.name,
        }),
      );
      expect(result.value).toEqual(mockCustomer);
    });
  });

  describe('delete', () => {
    it('should delete customer', async () => {
      // Arrange
      const id = 'test-id';
      service.delete.mockResolvedValue(Result.ok(true));

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('customerId', id);
      expect(result.value).toBe(true);
    });
  });
});
