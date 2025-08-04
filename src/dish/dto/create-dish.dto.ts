import { OmitType } from '@nestjs/swagger';
import { DishDto } from './dish.dto';

export class CreateDishDto extends OmitType(DishDto, ['id'] as const) {}
