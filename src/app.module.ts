import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MuscleModule } from './muscle/muscle.module';
import { ExerciseModule } from './exercise/exercise.module';
import { StrengthExerciseConfigurationModule } from './strength-exercise-configuration/strength-exercise-configuration.module';
import { CardioExerciseConfigurationModule } from './cardio-exercise-configuration/cardio-exercise-configuration.module';
import { ExerciseSetModule } from './exercise-set/exercise-set.module';
import { WorkoutModule } from './workout/workout.module';
import { UserWorkoutModule } from './user-workout/user-workout.module';
import { WorkoutSessionModule } from './workout-session/workout-session.module';
import { StrengthExerciseCompletionModule } from './strength-exercise-completion/strength-exercise-completion.module';
import { CardioExerciseCompletionModule } from './cardio-exercise-completion/cardio-exercise-completion.module';
import { HealthEntryModule } from './health-entry/health-entry.module';
import { MeasurementModule } from './measurement/measurement.module';
import { WaterPortionModule } from './water-portion/water-portion.module';
import { DishModule } from './dish/dish.module';
import { PortionModule } from './portion/portion.module';
import { MealModule } from './meal/meal.module';
import { RoleModule } from './role/role.module';

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
        autoLoadEntities: true,
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
    MealModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
