import { PickType } from '@nestjs/swagger';
import { MealDto } from './meal.dto';

export class CreateMealDto extends PickType(MealDto, [
  'name',
  'healthEntryId',
] as const) {}
