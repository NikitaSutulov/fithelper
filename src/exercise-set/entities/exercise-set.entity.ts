import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('exercise_sets')
export class ExerciseSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StrengthExerciseConfiguration)
  strengthExerciseConfiguration: Relation<StrengthExerciseConfiguration>;

  @Column()
  weight: number;

  @Column()
  reps: number;
}
