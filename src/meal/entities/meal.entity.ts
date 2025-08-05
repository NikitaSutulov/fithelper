import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { Portion } from 'src/portion/entities/portion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => HealthEntry)
  @JoinColumn({ name: 'health_entry_id' })
  healthEntry: HealthEntry;

  @OneToMany(() => Portion, (portion) => portion.meal)
  portions: Portion[];
}
