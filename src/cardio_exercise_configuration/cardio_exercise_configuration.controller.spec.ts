import { Test, TestingModule } from '@nestjs/testing';
import { CardioExerciseConfigurationController } from './cardio_exercise_configuration.controller';
import { CardioExerciseConfigurationService } from './cardio_exercise_configuration.service';

describe('CardioExerciseConfigurationController', () => {
  let controller: CardioExerciseConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardioExerciseConfigurationController],
      providers: [CardioExerciseConfigurationService],
    }).compile();

    controller = module.get<CardioExerciseConfigurationController>(CardioExerciseConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
