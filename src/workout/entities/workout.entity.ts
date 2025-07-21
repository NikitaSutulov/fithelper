import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Full-body workout' })
  @Column()
  name: string;

  @ManyToOne(() => User)
  author: User;

  @ApiProperty({ example: true })
  @Column()
  isPublic: boolean;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @Column({ name: 'update_date', type: 'timestamp' })
  updateTime: string;

  @ApiProperty({ isArray: true, type: CardioExerciseConfiguration })
  @OneToMany(() => CardioExerciseConfiguration, (config) => config.workout)
  cardioExerciseConfigurations: CardioExerciseConfiguration[];

  @ApiProperty({ isArray: true, type: StrengthExerciseConfiguration })
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
