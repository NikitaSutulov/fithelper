import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { CreateMuscleDto, UpdateMuscleDto } from './dto';

@Controller('muscle')
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Post()
  create(@Body() createMuscleDto: CreateMuscleDto) {
    return this.muscleService.create(createMuscleDto);
  }

  @Get()
  findAll() {
    return this.muscleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const muscle = await this.muscleService.findById(id);
    if (!muscle) {
      throw new NotFoundException('Muscle not found');
    }
    return muscle;
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMuscleDto: UpdateMuscleDto
  ) {
    return this.muscleService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.muscleService.delete(id);
  }
}
