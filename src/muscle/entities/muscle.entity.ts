import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('muscles')
export class Muscle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
