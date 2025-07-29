import { Test, TestingModule } from '@nestjs/testing';
import { CardioExerciseCompletionController } from './cardio-exercise-completion.controller';
import { CardioExerciseCompletionService } from './cardio-exercise-completion.service';

describe('CardioExerciseCompletionController', () => {
  let controller: CardioExerciseCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardioExerciseCompletionController],
      providers: [CardioExerciseCompletionService],
    }).compile();

    controller = module.get<CardioExerciseCompletionController>(CardioExerciseCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
