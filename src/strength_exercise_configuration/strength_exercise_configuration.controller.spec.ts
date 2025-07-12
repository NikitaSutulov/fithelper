import { Test, TestingModule } from '@nestjs/testing';
import { StrengthExerciseConfigurationController } from './strength_exercise_configuration.controller';
import { StrengthExerciseConfigurationService } from './strength_exercise_configuration.service';

describe('StrengthExerciseConfigurationController', () => {
  let controller: StrengthExerciseConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrengthExerciseConfigurationController],
      providers: [StrengthExerciseConfigurationService],
    }).compile();

    controller = module.get<StrengthExerciseConfigurationController>(StrengthExerciseConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
