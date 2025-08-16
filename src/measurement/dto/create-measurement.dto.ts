import { PickType } from '@nestjs/swagger';
import { MeasurementDto } from './measurement.dto';

export class CreateMeasurementDto extends PickType(MeasurementDto, [
  'userId',
  'weight',
] as const) {}
