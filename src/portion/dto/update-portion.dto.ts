import { PickType } from '@nestjs/swagger';
import { PortionDto } from './portion.dto';

export class UpdatePortionDto extends PickType(PortionDto, [
  'grams',
] as const) {}
