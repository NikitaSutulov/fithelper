import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('strength_exercise_completions')
export class StrengthExerciseCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StrengthExerciseConfiguration)
  @JoinColumn({ name: 'strength_exercise_configuration_id' })
  strengthExerciseConfiguration: StrengthExerciseConfiguration;

  @ManyToOne(() => WorkoutSession)
  @JoinColumn({ name: 'workout_session_id' })
  workoutSession: WorkoutSession;

  @Column({ name: 'is_completed' })
  isCompleted: boolean;
}
