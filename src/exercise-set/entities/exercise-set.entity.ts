import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('exercise_sets')
export class ExerciseSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StrengthExerciseConfiguration)
  @JoinColumn({ name: 'strength_exercise_configuration_id' })
  strengthExerciseConfiguration: Relation<StrengthExerciseConfiguration>;

  @Column()
  weight: number;

  @Column()
  reps: number;
}
