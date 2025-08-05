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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Muscle)
  @JoinTable({ name: 'exercise_muscles' })
  muscles: Muscle[];
}
