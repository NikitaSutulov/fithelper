import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
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

@Entity('cardio_exercise_completions')
export class CardioExerciseCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CardioExerciseConfiguration, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cardio_exercise_configuration_id' })
  cardioExerciseConfiguration: CardioExerciseConfiguration;

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
