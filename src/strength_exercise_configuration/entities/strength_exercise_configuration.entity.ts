import { ApiProperty } from '@nestjs/swagger';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('strength_exercise_configurations')
export class StrengthExerciseConfiguration {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: Exercise })
  @ManyToOne(() => Exercise)
  exercise: Exercise;
}
