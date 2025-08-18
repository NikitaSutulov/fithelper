import { Module } from '@nestjs/common';
import { UserWorkoutService } from './user-workout.service';
import { UserWorkoutController } from './user-workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWorkout } from './entities/user-workout.entity';
import { User } from 'src/user/entities/user.entity';
import { Workout } from 'src/workout/entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWorkout, User, Workout])],
  controllers: [UserWorkoutController],
  providers: [UserWorkoutService],
})
export class UserWorkoutModule {}
