import { Test, TestingModule } from '@nestjs/testing';
import ConfigurationPerLevelRepository from '@repositories/assessments/configuration-per-level.repository';
import { ConfigurationPerLevelService } from './configuration-per-level.service';

describe('ConfigurationPerLevelService', () => {
  let service: ConfigurationPerLevelService;
  let mockRepository: jest.Mocked<ConfigurationPerLevelRepository>;

  beforeEach(async () => {
    // Crear el mock del repository
    mockRepository = {
      repository: {
        findAndCount: jest.fn(),
        findOne: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationPerLevelService,
        {
          provide: ConfigurationPerLevelRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ConfigurationPerLevelService>(
      ConfigurationPerLevelService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated results successfully', async () => {
      // Arrange
      const page = 0;
      const size = 10;
      const mockData = [
        {
          configurationPerLevelId: '1',
          configurationLevelId: '1',
          levelId: '1',
          position: 1,
          status: true,
          configurationLevel: { name: 'Level 1' },
          level: { name: 'Test Level' },
        },
      ];
      const mockTotal = 1;

      // Configurar el mock correctamente
      mockRepository.repository.findAndCount = jest
        .fn()
        .mockResolvedValue([mockData, mockTotal]);

      // Act
      const result = await service.findAll(page, size);

      // Assert
      expect(result.isOk).toBe(true);
      expect(result).toEqual({
        isOk: true,
        isErr: false,
        error: null,
        value: {
          data: mockData,
          total: mockTotal,
        },
      });
      expect(mockRepository.repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
          order: undefined,
          skip: 0,
          take: 10,
          relations: expect.any(Object),
          select: expect.any(Object),
        }),
      );
    });
  });
});
