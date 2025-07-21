import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkoutController } from './user-workout.controller';
import { UserWorkoutService } from './user-workout.service';

describe('UserWorkoutController', () => {
  let controller: UserWorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWorkoutController],
      providers: [UserWorkoutService],
    }).compile();

    controller = module.get<UserWorkoutController>(UserWorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
