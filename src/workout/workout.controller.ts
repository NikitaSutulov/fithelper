import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Workout } from './entities/workout.entity';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a workout' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: Workout,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all workouts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: Workout,
  })
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Workout })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const workout = await this.workoutService.findById(id);
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Workout })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto
  ) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Workout })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.workoutService.delete(id);
  }
}
