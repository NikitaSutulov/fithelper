import { Test, TestingModule } from '@nestjs/testing';
import { CardioExerciseConfigurationService } from './cardio_exercise_configuration.service';

describe('CardioExerciseConfigurationService', () => {
  let service: CardioExerciseConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardioExerciseConfigurationService],
    }).compile();

    service = module.get<CardioExerciseConfigurationService>(CardioExerciseConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
