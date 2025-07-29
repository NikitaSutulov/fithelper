import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workout-sessions')
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserWorkout)
  userWorkout: UserWorkout;
}
