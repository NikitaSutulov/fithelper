import { ApiProperty } from '@nestjs/swagger';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('exercise_sets')
export class ExerciseSet {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: StrengthExerciseConfiguration })
  @ManyToOne(() => StrengthExerciseConfiguration)
  strengthExerciseConfiguration: Relation<StrengthExerciseConfiguration>;

  @ApiProperty({ example: 50 })
  @Column()
  weight: number;

  @ApiProperty({ example: 10 })
  @Column()
  reps: number;
}
