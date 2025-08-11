import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './workout-session.service';
import { WorkoutSessionController } from './workout-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutSession, UserWorkout, HealthEntry]),
  ],
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
})
export class WorkoutSessionModule {}
