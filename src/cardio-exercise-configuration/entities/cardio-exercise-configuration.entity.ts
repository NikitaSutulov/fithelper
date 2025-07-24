import { ApiProperty } from '@nestjs/swagger';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Workout } from 'src/workout/entities/workout.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('cardio_exercise_configurations')
export class CardioExerciseConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @ManyToOne(() => Workout)
  workout: Relation<Workout>;

  @Column()
  time: number;
}
