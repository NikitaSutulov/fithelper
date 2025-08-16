import { PickType } from '@nestjs/swagger';
import { MuscleDto } from './muscle.dto';

export class CreateMuscleDto extends PickType(MuscleDto, ['name'] as const) {}
