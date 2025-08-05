import { Dish } from 'src/dish/entities/dish.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('portions')
export class Portion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @Column({ type: 'float' })
  grams: number;

  @ManyToOne(() => Meal, (meal) => meal.portions)
  @JoinColumn({ name: 'meal_id' })
  meal: Meal;
}
