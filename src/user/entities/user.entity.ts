import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
@Check('height > 0')
export class User {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'username' })
  @Column()
  username: string;

  @ApiProperty({ example: 'user@example.com' })
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: '2000-12-30' })
  @Column({ type: 'date' })
  birthdate: string;

  @ApiProperty({ example: 'male' })
  @Column()
  gender: string;

  @ApiProperty({ example: 175 })
  @Column()
  height: number;

  @ApiProperty({ example: null })
  @Column({ name: 'profile_picture', nullable: true })
  profilePicture?: string;
}
