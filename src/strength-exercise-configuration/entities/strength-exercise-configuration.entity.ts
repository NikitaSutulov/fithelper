import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: Exercise })
  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @ApiProperty({ type: Workout })
  @ManyToOne(() => Workout)
  workout: Relation<Workout>;

  @ApiProperty({ isArray: true, type: ExerciseSet })
  @OneToMany(() => ExerciseSet, (set) => set.strengthExerciseConfiguration)
  sets: ExerciseSet[];
}
