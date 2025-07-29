import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './workout-session.service';
import { WorkoutSessionController } from './workout-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutSession, UserWorkout])],
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
})
export class WorkoutSessionModule {}
