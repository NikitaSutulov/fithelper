import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('water_portions')
export class WaterPortion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => HealthEntry)
  healthEntry: HealthEntry;

  @Column()
  amount: number;
}
