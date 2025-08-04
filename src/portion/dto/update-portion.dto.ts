import { PickType } from '@nestjs/swagger';
import { CreatePortionDto } from './create-portion.dto';

export class UpdatePortionDto extends PickType(CreatePortionDto, [
  'grams',
] as const) {}
