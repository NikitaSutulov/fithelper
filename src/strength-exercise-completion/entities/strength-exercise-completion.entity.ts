import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('strength_exercise_completions')
export class StrengthExerciseCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StrengthExerciseConfiguration, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strength_exercise_configuration_id' })
  strengthExerciseConfiguration: StrengthExerciseConfiguration;

  @ManyToOne(() => WorkoutSession, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_session_id' })
  workoutSession: WorkoutSession;

  @Column({ name: 'is_completed' })
  isCompleted: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
