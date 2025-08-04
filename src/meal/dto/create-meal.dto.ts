import { OmitType } from '@nestjs/swagger';
import { MealDto } from './meal.dto';

export class CreateMealDto extends OmitType(MealDto, [
  'id',
  'portionIds',
] as const) {}
