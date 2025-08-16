import { PickType } from '@nestjs/swagger';
import { HealthEntryDto } from './health-entry.dto';

export class CreateHealthEntryDto extends PickType(HealthEntryDto, [
  'userId',
  'stepsCount',
] as const) {}
