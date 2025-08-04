import { OmitType } from '@nestjs/swagger';
import { PortionDto } from './portion.dto';

export class CreatePortionDto extends OmitType(PortionDto, ['id'] as const) {}
