import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import {
  AddMuscleDto,
  CreateExerciseDto,
  ExerciseDto,
  UpdateExerciseDto,
} from './dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';

@Controller('exercise')
@UseGuards(AuthGuard)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Creates an exercise' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all exercises' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: ExerciseDto,
  })
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds an exercise with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Exercise ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const exercise = await this.exerciseService.findById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an exercise with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Exercise ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an exercise with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Exercise ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exerciseService.delete(id);
  }

  @Get(':id/muscles')
  @ApiOperation({
    summary: 'Finds all muscles associated with the exercise with specified id',
  })
  @ApiParam({ name: 'id', required: true, description: 'Exercise ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise not found',
  })
  getMuscles(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exerciseService.getMuscles(id);
  }

  @Post(':id/muscles')
  @ApiOperation({
    summary:
      'Creates an association of a muscle with specified id and an exercise with specified id',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise not found',
  })
  addMuscle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() addMuscleDto: AddMuscleDto
  ) {
    return this.exerciseService.addMuscle(id, addMuscleDto);
  }

  @Delete(':id/muscles/:muscleId')
  @ApiOperation({
    summary:
      'Deletes an association of a muscle with specified id and an exercise with specified id',
  })
  @ApiParam({ name: 'id', required: true, description: 'Exercise ID' })
  @ApiParam({ name: 'muscleId', required: true, description: 'Muscle ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ExerciseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Exercise not found',
  })
  deleteMuscle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('muscleId', new ParseUUIDPipe()) muscleId: string
  ) {
    return this.exerciseService.deleteMuscle(id, muscleId);
  }
}
