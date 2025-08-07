import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkout } from './entities/user-workout.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { WorkoutService } from 'src/workout/workout.service';
import { CreateUserWorkoutDto, UserWorkoutDto } from './dto';

@Injectable()
export class UserWorkoutService {
  constructor(
    @InjectRepository(UserWorkout)
    private readonly userWorkoutsRepo: Repository<UserWorkout>,
    private readonly userService: UserService,
    private readonly workoutService: WorkoutService
  ) {}

  private toDto(userWorkout: UserWorkout): UserWorkoutDto {
    return {
      id: userWorkout.id,
      userId: userWorkout.user.id,
      workoutId: userWorkout.workout.id,
      isOwner: userWorkout.isOwner,
      createdAt: userWorkout.createdAt,
    };
  }

  async create(
    createUserWorkoutDto: CreateUserWorkoutDto
  ): Promise<UserWorkoutDto> {
    const user = await this.userService.findById(createUserWorkoutDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const workout = await this.workoutService.findById(
      createUserWorkoutDto.workoutId
    );
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    const isOwner = workout.authorId === user.id;
    if (!isOwner && !workout.isPublic) {
      throw new ForbiddenException(
        'Access denied: Private workout of another user'
      );
    }
    const existingUserWorkout = (await this.findByUserId(user.id)).find(
      (uw) => uw.workoutId === workout.id
    );
    if (existingUserWorkout) {
      throw new BadRequestException(
        'A user workout for the given user and workout already exists'
      );
    }
    const newUserWorkout = this.userWorkoutsRepo.create({
      user,
      workout,
      isOwner,
    });
    return this.toDto(await this.userWorkoutsRepo.save(newUserWorkout));
  }

  async findAll(): Promise<UserWorkoutDto[]> {
    return (
      await this.userWorkoutsRepo.find({ relations: ['user', 'workout'] })
    ).map(this.toDto);
  }

  async findByUserId(userId: string): Promise<UserWorkoutDto[]> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return (
      await this.userWorkoutsRepo.find({
        where: { user: { id: user.id } },
        relations: ['user', 'workout'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<UserWorkoutDto | null> {
    const userWorkout = await this.userWorkoutsRepo.findOne({
      where: { id },
      relations: ['user', 'workout'],
    });
    return userWorkout ? this.toDto(userWorkout) : null;
  }

  async delete(id: string): Promise<UserWorkoutDto> {
    const userWorkoutToDelete = await this.findById(id);
    if (!userWorkoutToDelete) {
      throw new NotFoundException('User workout not found');
    }
    await this.userWorkoutsRepo.delete({ id });
    return userWorkoutToDelete;
  }
}
