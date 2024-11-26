import { RatingScale } from '@entities/assessments/rating-scale.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RatingScaleRepository from './rating-scale.repository';

describe('RatingScaleRepository', () => {
  let ratingScaleRepository: RatingScaleRepository;
  let repository: Repository<RatingScale>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RatingScaleRepository,
        {
          provide: getRepositoryToken(RatingScale),
          useClass: Repository,
        },
      ],
    }).compile();

    ratingScaleRepository = module.get<RatingScaleRepository>(
      RatingScaleRepository,
    );
    repository = module.get<Repository<RatingScale>>(
      getRepositoryToken(RatingScale),
    );
  });

  describe('constructor', () => {
    it('should be defined', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      // No explicit action needed - constructor called in beforeEach

      // Assert
      expect(ratingScaleRepository).toBeDefined();
    });

    it('should have repository property initialized', () => {
      // Arrange
      // No additional arrangement needed - handled by beforeEach

      // Act
      const repoProperty = ratingScaleRepository['repository'];

      // Assert
      expect(repoProperty).toBeDefined();
      expect(repoProperty).toBeInstanceOf(Repository);
      expect(repoProperty).toBe(repository);
    });
  });
});
