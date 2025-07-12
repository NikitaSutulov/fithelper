import { ApiProperty } from '@nestjs/swagger';
import { StrengthExerciseConfiguration } from 'src/strength_exercise_configuration/entities/strength_exercise_configuration.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercise_sets')
export class ExerciseSet {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StrengthExerciseConfiguration)
  strengthExerciseConfiguration: StrengthExerciseConfiguration;

  @ApiProperty({ example: 50 })
  @Column()
  weight: number;

  @ApiProperty({ example: 10 })
  @Column()
  reps: number;
}
