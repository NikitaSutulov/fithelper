import { Dish } from 'src/dish/entities/dish.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portions')
export class Portion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Dish)
  dish: Dish;

  @Column({ type: 'float' })
  grams: number;
}
