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
import { CreateUserWorkoutDto } from './dto';

@Injectable()
export class UserWorkoutService {
  constructor(
    @InjectRepository(UserWorkout)
    private readonly userWorkoutsRepo: Repository<UserWorkout>,
    private readonly userService: UserService,
    private readonly workoutService: WorkoutService
  ) {}

  async create(
    createUserWorkoutDto: CreateUserWorkoutDto
  ): Promise<UserWorkout> {
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
    const isOwner = workout.author.id === user.id;
    if (!isOwner && !workout.isPublic) {
      throw new ForbiddenException(
        'Access denied: Private workout of another user'
      );
    }
    const existingUserWorkout = (await this.findByUserId(user.id)).find(
      (uw) => uw.workout.id === workout.id
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
    return this.userWorkoutsRepo.save(newUserWorkout);
  }

  async findAll(): Promise<UserWorkout[]> {
    return this.userWorkoutsRepo.find({ relations: ['user', 'workout'] });
  }

  async findByUserId(userId: string): Promise<UserWorkout[]> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userWorkoutsRepo.find({
      where: { user },
      relations: ['user', 'workout'],
    });
  }

  async findById(id: string): Promise<UserWorkout | null> {
    return this.userWorkoutsRepo.findOne({
      where: { id },
      relations: ['user', 'workout'],
    });
  }

  async delete(id: string): Promise<UserWorkout> {
    const userWorkoutToDelete = await this.findById(id);
    if (!userWorkoutToDelete) {
      throw new NotFoundException('User workout not found');
    }
    await this.userWorkoutsRepo.remove(userWorkoutToDelete);
    return userWorkoutToDelete;
  }
}
