import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
@Check('height > 0')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column()
  gender: string;

  @Column()
  height: number;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture?: string;
}
