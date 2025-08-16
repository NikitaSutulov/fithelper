import { PickType } from '@nestjs/swagger';
import { HealthEntryDto } from './health-entry.dto';

export class UpdateHealthEntryDto extends PickType(HealthEntryDto, [
  'stepsCount',
] as const) {}
