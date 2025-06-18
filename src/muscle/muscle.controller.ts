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
  HttpStatus,
} from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { CreateMuscleDto, UpdateMuscleDto } from './dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Muscle } from './entities/muscle.entity';

@Controller('muscle')
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a muscle' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: Muscle,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createMuscleDto: CreateMuscleDto) {
    return this.muscleService.create(createMuscleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all muscles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: Muscle,
  })
  findAll() {
    return this.muscleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a muscle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Muscle ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Muscle })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const muscle = await this.muscleService.findById(id);
    if (!muscle) {
      throw new NotFoundException('Muscle not found');
    }
    return muscle;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a muscle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Muscle ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Muscle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found',
  })
  @ApiBody({ type: UpdateMuscleDto })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMuscleDto: UpdateMuscleDto
  ) {
    return this.muscleService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a muscle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Muscle ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Muscle })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.muscleService.delete(id);
  }
}
