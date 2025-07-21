import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workout]), UserModule],
  exports: [WorkoutService],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
