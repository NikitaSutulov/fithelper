import { ApiProperty } from '@nestjs/swagger';
import { Muscle } from 'src/muscle/entities/muscle.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('exercises')
export class Exercise {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Bench press' })
  @Column()
  name: string;

  @ApiProperty({
    example:
      'A weight training exercise where a person presses a weight upwards while lying horizontally on a weight training bench.',
  })
  @Column()
  description: string;

  @ApiProperty({ isArray: true, type: Muscle })
  @ManyToMany(() => Muscle)
  @JoinTable()
  muscles: Muscle[];
}
