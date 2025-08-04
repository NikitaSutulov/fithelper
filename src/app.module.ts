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
import { WorkoutSessionModule } from './workout-session/workout-session.module';
import { WorkoutSession } from './workout-session/entities/workout-session.entity';
import { StrengthExerciseCompletionModule } from './strength-exercise-completion/strength-exercise-completion.module';
import { StrengthExerciseCompletion } from './strength-exercise-completion/entities/strength-exercise-completion.entity';
import { CardioExerciseCompletionModule } from './cardio-exercise-completion/cardio-exercise-completion.module';
import { CardioExerciseCompletion } from './cardio-exercise-completion/entities/cardio-exercise-completion.entity';
import { HealthEntryModule } from './health-entry/health-entry.module';
import { HealthEntry } from './health-entry/entities/health-entry.entity';
import { MeasurementModule } from './measurement/measurement.module';
import { Measurement } from './measurement/entities/measurement.entity';
import { WaterPortionModule } from './water-portion/water-portion.module';
import { WaterPortion } from './water-portion/entities/water-portion.entity';
import { DishModule } from './dish/dish.module';
import { Dish } from './dish/entities/dish.entity';
import { PortionModule } from './portion/portion.module';
import { Portion } from './portion/entities/portion.entity';

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
          WorkoutSession,
          StrengthExerciseCompletion,
          CardioExerciseCompletion,
          HealthEntry,
          Measurement,
          WaterPortion,
          Dish,
          Portion,
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
    WorkoutSessionModule,
    StrengthExerciseCompletionModule,
    CardioExerciseCompletionModule,
    HealthEntryModule,
    MeasurementModule,
    WaterPortionModule,
    DishModule,
    PortionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
