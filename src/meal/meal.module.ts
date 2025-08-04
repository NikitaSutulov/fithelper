import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, HealthEntry])],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
