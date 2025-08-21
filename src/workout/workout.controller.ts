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
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto, UpdateWorkoutDto, WorkoutDto } from './dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, WorkoutWriteAccessGuard } from 'src/auth/guards';
import { WorkoutReadAccessGuard } from 'src/auth/guards';

@Controller('workout')
@UseGuards(AuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a workout' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: WorkoutDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Post('copy/:id')
  @UseGuards(WorkoutReadAccessGuard)
  @ApiOperation({
    summary:
      'Copies a workout with specified id making a user with specified id the author of the workout copy.',
  })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: WorkoutDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout or author for the copy not found',
  })
  copy(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createWorkoutDto: CreateWorkoutDto
  ) {
    return this.workoutService.copy(id, createWorkoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all workouts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: WorkoutDto,
  })
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  @UseGuards(WorkoutReadAccessGuard)
  @ApiOperation({ summary: 'Finds a workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WorkoutDto,
  })
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
  @UseGuards(WorkoutWriteAccessGuard)
  @ApiOperation({ summary: 'Updates a workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WorkoutDto,
  })
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
  @UseGuards(WorkoutWriteAccessGuard)
  @ApiOperation({ summary: 'Deletes a workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WorkoutDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.workoutService.delete(id);
  }
}
