import { Test, TestingModule } from '@nestjs/testing';
import { StrengthExerciseCompletionController } from './strength-exercise-completion.controller';
import { StrengthExerciseCompletionService } from './strength-exercise-completion.service';

describe('StrengthExerciseCompletionController', () => {
  let controller: StrengthExerciseCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrengthExerciseCompletionController],
      providers: [StrengthExerciseCompletionService],
    }).compile();

    controller = module.get<StrengthExerciseCompletionController>(StrengthExerciseCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
