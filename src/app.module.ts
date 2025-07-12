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
import { StrengthExerciseConfigurationModule } from './strength_exercise_configuration/strength_exercise_configuration.module';
import { StrengthExerciseConfiguration } from './strength_exercise_configuration/entities/strength_exercise_configuration.entity';

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
        entities: [User, Muscle, Exercise, StrengthExerciseConfiguration],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    MuscleModule,
    ExerciseModule,
    StrengthExerciseConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
