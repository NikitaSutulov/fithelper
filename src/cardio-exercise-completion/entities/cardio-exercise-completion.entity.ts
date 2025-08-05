import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cardio_exercise_completions')
export class CardioExerciseCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CardioExerciseConfiguration)
  @JoinColumn({ name: 'cardio_exercise_configuration_id' })
  cardioExerciseConfiguration: CardioExerciseConfiguration;

  @ManyToOne(() => WorkoutSession)
  @JoinColumn({ name: 'workout_session_id' })
  workoutSession: WorkoutSession;

  @Column({ name: 'is_completed' })
  isCompleted: boolean;
}
