import { User } from 'src/user/entities/user.entity';
import { Workout } from 'src/workout/entities/workout.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_workouts')
export class UserWorkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workout)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column({ name: 'is_owner' })
  isOwner: boolean;
}
