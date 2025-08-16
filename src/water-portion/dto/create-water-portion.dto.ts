import { PickType } from '@nestjs/swagger';
import { WaterPortionDto } from './water-portion.dto';

export class CreateWaterPortionDto extends PickType(WaterPortionDto, [
  'healthEntryId',
  'amount',
] as const) {}
