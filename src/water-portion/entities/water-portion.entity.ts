import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('water_portions')
export class WaterPortion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => HealthEntry)
  @JoinColumn({ name: 'health_entry_id' })
  healthEntry: HealthEntry;

  @Column()
  amount: number;
}
