import { Test, TestingModule } from '@nestjs/testing';
import { StrengthExerciseCompletionService } from './strength-exercise-completion.service';

describe('StrengthExerciseCompletionService', () => {
  let service: StrengthExerciseCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrengthExerciseCompletionService],
    }).compile();

    service = module.get<StrengthExerciseCompletionService>(StrengthExerciseCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
