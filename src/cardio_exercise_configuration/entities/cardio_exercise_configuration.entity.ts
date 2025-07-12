import { ApiProperty } from '@nestjs/swagger';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cardio_exercise_configurations')
export class CardioExerciseConfiguration {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: Exercise })
  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @ApiProperty({ example: 600 })
  @Column()
  time: number;
}
