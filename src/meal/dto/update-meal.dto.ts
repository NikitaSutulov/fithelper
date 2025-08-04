import { PickType } from '@nestjs/swagger';
import { CreateMealDto } from './create-meal.dto';

export class UpdateMealDto extends PickType(CreateMealDto, ['name'] as const) {}
