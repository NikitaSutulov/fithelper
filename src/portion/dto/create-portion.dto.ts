import { PickType } from '@nestjs/swagger';
import { PortionDto } from './portion.dto';

export class CreatePortionDto extends PickType(PortionDto, [
  'dishId',
  'mealId',
  'grams',
] as const) {}
