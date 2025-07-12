import { Test, TestingModule } from '@nestjs/testing';
import { StrengthExerciseConfigurationService } from './strength_exercise_configuration.service';

describe('StrengthExerciseConfigurationService', () => {
  let service: StrengthExerciseConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrengthExerciseConfigurationService],
    }).compile();

    service = module.get<StrengthExerciseConfigurationService>(StrengthExerciseConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
