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
import { ExerciseSetService } from './exercise_set.service';
import { CreateExerciseSetDto, UpdateExerciseSetDto } from './dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ExerciseSet } from './entities/exercise_set.entity';

@Controller('exercise-set')
export class ExerciseSetController {
  constructor(private readonly exerciseSetService: ExerciseSetService) {}

  @Post()
  @ApiOperation({ summary: 'Creates an exercise set' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: ExerciseSet,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createExerciseSetDto: CreateExerciseSetDto) {
    return this.exerciseSetService.create(createExerciseSetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all exercise sets' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: ExerciseSet,
  })
  findAll() {
    return this.exerciseSetService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds an exercise set with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Exercise set ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseSet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise set not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const exerciseSet = await this.exerciseSetService.findById(id);
    if (!exerciseSet) {
      throw new NotFoundException('Exercise set not found');
    }
    return exerciseSet;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an exercise set with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Exercise set ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseSet,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise set not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateExerciseSetDto: UpdateExerciseSetDto
  ) {
    return this.exerciseSetService.update(id, updateExerciseSetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an exercise set with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Exercise set ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseSet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise set not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exerciseSetService.delete(id);
  }
}
