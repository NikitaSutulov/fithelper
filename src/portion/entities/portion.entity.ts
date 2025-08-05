import { Dish } from 'src/dish/entities/dish.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
