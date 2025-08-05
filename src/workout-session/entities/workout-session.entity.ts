import { CardioExerciseCompletion } from 'src/cardio-exercise-completion/entities/cardio-exercise-completion.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { StrengthExerciseCompletion } from 'src/strength-exercise-completion/entities/strength-exercise-completion.entity';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workout_sessions')
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserWorkout)
  userWorkout: UserWorkout;

  @ManyToOne(() => HealthEntry)
  healthEntry: HealthEntry;

  @OneToMany(
    () => StrengthExerciseCompletion,
    (strengthExerciseCompletion) => strengthExerciseCompletion.workoutSession
  )
  strengthExerciseCompletions: StrengthExerciseCompletion[];

  @OneToMany(
    () => CardioExerciseCompletion,
    (CardioExerciseCompletion) => CardioExerciseCompletion.workoutSession
  )
  cardioExerciseCompletions: CardioExerciseCompletion[];
}
