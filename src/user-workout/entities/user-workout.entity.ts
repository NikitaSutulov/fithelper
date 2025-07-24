import { User } from 'src/user/entities/user.entity';
import { Workout } from 'src/workout/entities/workout.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_workouts')
export class UserWorkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Workout)
  workout: Workout;

  @Column()
  isOwner: boolean;
}
