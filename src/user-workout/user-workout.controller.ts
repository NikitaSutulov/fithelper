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
} from '@nestjs/common';
import { UserWorkoutService } from './user-workout.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserWorkout } from './entities/user-workout.entity';
import { CreateUserWorkoutDto } from './dto';

@Controller('user-workout')
export class UserWorkoutController {
  constructor(private readonly userWorkoutService: UserWorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a user workout' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: UserWorkout,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied: Private workout of another user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or workout not found',
  })
  create(@Body() createUserWorkoutDto: CreateUserWorkoutDto) {
    return this.userWorkoutService.create(createUserWorkoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all user workouts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: UserWorkout,
  })
  findAll() {
    return this.userWorkoutService.findAll();
  }

  @Get('by-user-id/:userId')
  @ApiOperation({ summary: 'Finds user workouts with specified user id' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: UserWorkout,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async findByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userWorkoutService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a user workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserWorkout,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User workout not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const userWorkout = await this.userWorkoutService.findById(id);
    if (!userWorkout) {
      throw new NotFoundException('User workout not found');
    }
    return userWorkout;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a user workout with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserWorkout,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User workout not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userWorkoutService.delete(id);
  }
}
