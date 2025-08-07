import { PickType } from '@nestjs/swagger';
import { MealDto } from './meal.dto';

export class UpdateMealDto extends PickType(MealDto, ['name'] as const) {}
