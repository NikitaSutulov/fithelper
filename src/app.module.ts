import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { MuscleModule } from './muscle/muscle.module';
import { Muscle } from './muscle/entities/muscle.entity';
import { ExerciseModule } from './exercise/exercise.module';
import { Exercise } from './exercise/entities/exercise.entity';
import { StrengthExerciseConfigurationModule } from './strength-exercise-configuration/strength-exercise-configuration.module';
import { StrengthExerciseConfiguration } from './strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { CardioExerciseConfigurationModule } from './cardio-exercise-configuration/cardio-exercise-configuration.module';
import { CardioExerciseConfiguration } from './cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { ExerciseSetModule } from './exercise-set/exercise-set.module';
import { ExerciseSet } from './exercise-set/entities/exercise-set.entity';
import { WorkoutModule } from './workout/workout.module';
import { Workout } from './workout/entities/workout.entity';
import { UserWorkoutModule } from './user-workout/user-workout.module';
import { UserWorkout } from './user-workout/entities/user-workout.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [
          User,
          Muscle,
          Exercise,
          StrengthExerciseConfiguration,
          CardioExerciseConfiguration,
          ExerciseSet,
          Workout,
          UserWorkout,
        ],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    MuscleModule,
    ExerciseModule,
    StrengthExerciseConfigurationModule,
    CardioExerciseConfigurationModule,
    ExerciseSetModule,
    WorkoutModule,
    UserWorkoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
