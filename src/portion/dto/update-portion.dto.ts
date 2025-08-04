import { PartialType } from '@nestjs/swagger';
import { PortionDto } from './portion.dto';

export class UpdatePortionDto extends PartialType(PortionDto) {}
