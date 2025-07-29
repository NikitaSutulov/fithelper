import { Test, TestingModule } from '@nestjs/testing';
import { CardioExerciseCompletionService } from './cardio-exercise-completion.service';

describe('CardioExerciseCompletionService', () => {
  let service: CardioExerciseCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardioExerciseCompletionService],
    }).compile();

    service = module.get<CardioExerciseCompletionService>(CardioExerciseCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
