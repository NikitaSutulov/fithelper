import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('strength_exercise_completions')
export class StrengthExerciseCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StrengthExerciseConfiguration)
  strengthExerciseConfiguration: StrengthExerciseConfiguration;

  @ManyToOne(() => WorkoutSession)
  workoutSession: WorkoutSession;

  @Column()
  isCompleted: boolean;
}
