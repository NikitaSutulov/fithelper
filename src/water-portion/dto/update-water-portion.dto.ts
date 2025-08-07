import { PickType } from '@nestjs/swagger';
import { WaterPortionDto } from './water-portion.dto';

export class UpdateWaterPortionDto extends PickType(WaterPortionDto, [
  'amount',
] as const) {}
