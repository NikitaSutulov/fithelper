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
} from 'typeorm';

@Entity('health_entries')
export class HealthEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'entry_date', type: 'date' })
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
}
