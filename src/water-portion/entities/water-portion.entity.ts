import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
