import { Module } from '@nestjs/common';
import { UserWorkoutService } from './user-workout.service';
import { UserWorkoutController } from './user-workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWorkout } from './entities/user-workout.entity';
import { UserModule } from 'src/user/user.module';
import { WorkoutModule } from 'src/workout/workout.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserWorkout]), UserModule, WorkoutModule],
  controllers: [UserWorkoutController],
  providers: [UserWorkoutService],
})
export class UserWorkoutModule {}
