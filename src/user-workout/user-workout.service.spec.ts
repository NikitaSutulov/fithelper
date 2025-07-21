import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkoutService } from './user-workout.service';

describe('UserWorkoutService', () => {
  let service: UserWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWorkoutService],
    }).compile();

    service = module.get<UserWorkoutService>(UserWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
