import { Exercise } from 'src/exercise/entities/exercise.entity';
import { ExerciseSet } from 'src/exercise-set/entities/exercise-set.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @ManyToOne(() => Workout)
  @JoinColumn({ name: 'workout_id' })
  workout: Relation<Workout>;

  @OneToMany(() => ExerciseSet, (set) => set.strengthExerciseConfiguration)
  sets: ExerciseSet[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
