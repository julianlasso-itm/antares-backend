import Result from '@common/utils/result/result.util';
import { DocumentType } from '@entities/human-resources/enums/document-type.enum';
import { Professionals } from '@entities/human-resources/professionals.entity';
import { NewProfessionalsRequestDto } from '@human-resources/dto/new-professionals-request.dto';
import { UpdateProfessionalsRequestDto } from '@human-resources/dto/update-professionals-request.dto';
import { ProfessionalsService } from '@human-resources/services/professionals.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllResponse } from '@repositories/find-all.response';
import { ProfessionalsController } from './professionals.controller';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'mock-ulid'),
}));

describe('ProfessionalsController', () => {
  let controller: ProfessionalsController;
  let service: jest.Mocked<ProfessionalsService>;

  const mockProfessional = new Professionals();
  mockProfessional.professionalId = 'test-id';
  mockProfessional.documentType = DocumentType.CC;
  mockProfessional.document = '123456789';
  mockProfessional.name = 'Test Professional';
  mockProfessional.email = 'test@example.com';
  mockProfessional.status = true;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalsController],
      providers: [
        {
          provide: ProfessionalsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProfessionalsController>(ProfessionalsController);
    service = module.get(ProfessionalsService);
  });

  describe('findAll', () => {
    it('should return paginated professionals list', async () => {
      // Arrange
      const mockResponse = new FindAllResponse([mockProfessional], 1);
      service.findAll.mockResolvedValue(Result.ok(mockResponse));

      // Act
      const result = await controller.findAll(0, 10, 'search');

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(
        0,
        10,
        { status: 'DESC', createdAt: 'ASC' },
        ['documentType', 'document', 'name', 'email'],
        'search',
      );
      expect(result.value).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single professional', async () => {
      // Arrange
      service.findOne.mockResolvedValue(Result.ok(mockProfessional));
      const id = 'test-id';

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith('professionalId', id);
      expect(result.value).toEqual(mockProfessional);
    });
  });

  describe('create', () => {
    it('should create a new professional', async () => {
      // Arrange
      const createDto: NewProfessionalsRequestDto = {
        documentType: DocumentType.CC,
        document: '123456789',
        name: 'Test Professional',
        email: 'test@example.com',
        photo: 'test-photo.jpg',
      };
      service.create.mockResolvedValue(Result.ok(mockProfessional));

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          professionalId: 'mock-ulid',
          documentType: createDto.documentType,
          document: createDto.document,
          name: createDto.name,
          email: createDto.email,
          photo: createDto.photo,
        }),
      );
      expect(result.value).toEqual(mockProfessional);
    });
  });

  describe('update', () => {
    it('should update an existing professional', async () => {
      // Arrange
      const updateDto: UpdateProfessionalsRequestDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
        photo: 'updated-photo.jpg',
        status: false,
      };
      service.update.mockResolvedValue(Result.ok(mockProfessional));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'professionalId',
        id,
        expect.objectContaining({
          name: updateDto.name,
          email: updateDto.email,
          photo: updateDto.photo,
          status: updateDto.status,
        }),
      );
      expect(result.value).toEqual(mockProfessional);
    });

    it('should update only provided fields', async () => {
      // Arrange
      const updateDto: UpdateProfessionalsRequestDto = {
        name: 'Updated Name',
      };
      service.update.mockResolvedValue(Result.ok(mockProfessional));
      const id = 'test-id';

      // Act
      const result = await controller.update(updateDto, id);

      // Assert
      expect(service.update).toHaveBeenCalledWith(
        'professionalId',
        id,
        expect.objectContaining({
          name: updateDto.name,
        }),
      );
      expect(result.value).toEqual(mockProfessional);
    });
  });

  describe('delete', () => {
    it('should delete a professional', async () => {
      // Arrange
      service.delete.mockResolvedValue(Result.ok(true));
      const id = 'test-id';

      // Act
      const result = await controller.delete(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith('professionalId', id);
      expect(result.value).toBe(true);
    });
  });
});
