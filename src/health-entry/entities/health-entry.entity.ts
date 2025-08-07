import { Meal } from 'src/meal/entities/meal.entity';
import { User } from 'src/user/entities/user.entity';
import { WaterPortion } from 'src/water-portion/entities/water-portion.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('health_entries')
export class HealthEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'entry_date',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  entryDate: string;

  @Column({ name: 'steps_count' })
  stepsCount: number;

  @OneToMany(
    () => WorkoutSession,
    (workoutSession) => workoutSession.healthEntry
  )
  workoutSessions: WorkoutSession[];

  @OneToMany(() => WaterPortion, (waterPortion) => waterPortion.healthEntry)
  waterPortions: WaterPortion[];

  @OneToMany(() => Meal, (meal) => meal.healthEntry)
  meals: Meal[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
