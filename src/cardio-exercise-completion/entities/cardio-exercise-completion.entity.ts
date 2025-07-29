import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cardio_exercise_completions')
export class CardioExerciseCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CardioExerciseConfiguration)
  cardioExerciseConfiguration: CardioExerciseConfiguration;

  @ManyToOne(() => WorkoutSession)
  workoutSession: WorkoutSession;

  @Column()
  isCompleted: boolean;
}
