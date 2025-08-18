import { CardioExerciseCompletion } from 'src/cardio-exercise-completion/entities/cardio-exercise-completion.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { StrengthExerciseCompletion } from 'src/strength-exercise-completion/entities/strength-exercise-completion.entity';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workout_sessions')
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserWorkout, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_workout_id' })
  userWorkout: UserWorkout;

  @ManyToOne(() => HealthEntry, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'health_entry_id' })
  healthEntry: HealthEntry;

  @OneToMany(
    () => StrengthExerciseCompletion,
    (strengthExerciseCompletion) => strengthExerciseCompletion.workoutSession
  )
  strengthExerciseCompletions: StrengthExerciseCompletion[];

  @OneToMany(
    () => CardioExerciseCompletion,
    (cardioExerciseCompletion) => cardioExerciseCompletion.workoutSession
  )
  cardioExerciseCompletions: CardioExerciseCompletion[];

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
