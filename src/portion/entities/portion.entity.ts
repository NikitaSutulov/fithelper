import { Dish } from 'src/dish/entities/dish.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portions')
export class Portion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Dish)
  dish: Dish;

  @Column({ type: 'float' })
  grams: number;

  @ManyToOne(() => Meal, (meal) => meal.portions)
  meal: Meal;
}
