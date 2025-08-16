import { PickType } from '@nestjs/swagger';
import { MeasurementDto } from './measurement.dto';

export class UpdateMeasurementDto extends PickType(MeasurementDto, [
  'weight',
] as const) {}
