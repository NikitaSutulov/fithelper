import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dishes')
export class Dish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  calories: number;

  @Column({ type: 'float' })
  proteins: number;

  @Column({ type: 'float' })
  fats: number;

  @Column({ type: 'float' })
  carbohydrates: number;
}
