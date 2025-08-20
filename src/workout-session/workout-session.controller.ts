import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkoutSessionService } from './workout-session.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateWorkoutSessionDto, WorkoutSessionDto } from './dto';
import { AuthGuard } from 'src/auth/guards';

@Controller('workout-session')
@UseGuards(AuthGuard)
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a workout session' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: WorkoutSessionDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User workout not found',
  })
  create(@Body() createWorkoutSessionDto: CreateWorkoutSessionDto) {
    return this.workoutSessionService.create(createWorkoutSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all workout sessions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: WorkoutSessionDto,
  })
  findAll() {
    return this.workoutSessionService.findAll();
  }

  @Get('by-user-workout-id/:userWorkoutId')
  @ApiOperation({
    summary: 'Finds workout sessions with specified user workout id',
  })
  @ApiParam({
    name: 'userWorkoutId',
    required: true,
    description: 'User workout ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: WorkoutSessionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User workout not found',
  })
  async findByUserWorkoutId(
    @Param('userWorkoutId', new ParseUUIDPipe()) userWorkoutId: string
  ) {
    return this.workoutSessionService.findByUserWorkoutId(userWorkoutId);
  }

  @Get('by-health-entry-id/:healthEntryId')
  @ApiOperation({
    summary: 'Finds workout sessions with specified health entry id',
  })
  @ApiParam({
    name: 'healthEntryId',
    required: true,
    description: 'Health entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: WorkoutSessionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  async findByHealthEntryId(
    @Param('healthEntryId', new ParseUUIDPipe()) healthEntryId: string
  ) {
    return this.workoutSessionService.findByHealthEntryId(healthEntryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a workout session with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout session ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WorkoutSessionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout session not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const workoutSession = await this.workoutSessionService.findById(id);
    if (!workoutSession) {
      throw new NotFoundException('Workout session not found');
    }
    return workoutSession;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a workout session with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Workout session ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WorkoutSessionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout session not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.workoutSessionService.delete(id);
  }
}
