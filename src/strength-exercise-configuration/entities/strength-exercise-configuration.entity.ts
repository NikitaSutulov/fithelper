import { Exercise } from 'src/exercise/entities/exercise.entity';
import { ExerciseSet } from 'src/exercise-set/entities/exercise-set.entity';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Workout } from 'src/workout/entities/workout.entity';

@Entity('strength_exercise_configurations')
export class StrengthExerciseConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @ManyToOne(() => Workout)
  workout: Relation<Workout>;

  @OneToMany(() => ExerciseSet, (set) => set.strengthExerciseConfiguration)
  sets: ExerciseSet[];
}
