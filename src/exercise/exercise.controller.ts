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
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AddMuscleDto, CreateExerciseDto, UpdateExerciseDto } from './dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const exercise = await this.exerciseService.findById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise;
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exerciseService.delete(id);
  }

  @Get(':id/muscles')
  getMuscles(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exerciseService.getMuscles(id);
  }

  @Post(':id/muscles')
  addMuscle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() addMuscleDto: AddMuscleDto
  ) {
    return this.exerciseService.addMuscle(id, addMuscleDto);
  }

  @Delete(':id/muscles/:muscleId')
  deleteMuscle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('muscleId', new ParseUUIDPipe()) muscleId: string
  ) {
    return this.exerciseService.deleteMuscle(id, muscleId);
  }
}
