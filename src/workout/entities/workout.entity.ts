import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { User } from 'src/user/entities/user.entity';
import {
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User)
  author: User;

  @Column()
  isPublic: boolean;

  @Column({ name: 'update_date', type: 'timestamp' })
  updateTime: string;

  @OneToMany(() => CardioExerciseConfiguration, (config) => config.workout)
  cardioExerciseConfigurations: CardioExerciseConfiguration[];

  @OneToMany(() => StrengthExerciseConfiguration, (config) => config.workout)
  strengthExerciseConfigurations: StrengthExerciseConfiguration[];

  @AfterUpdate()
  setNewUpdateTime() {
    const updateTime = new Date();
    this.updateTime = updateTime.toISOString();
  }

  @BeforeInsert()
  setUpdateTime() {
    this.setNewUpdateTime();
  }
}
