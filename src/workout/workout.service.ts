import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepo: Repository<Workout>,
    private readonly userService: UserService
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const author = await this.userService.findById(createWorkoutDto.authorId);
    if (!author) {
      throw new BadRequestException('Author not found');
    }
    const { name, isPublic } = createWorkoutDto;
    const newWorkout = this.workoutsRepo.create({
      name,
      author,
      isPublic,
    });
    return this.workoutsRepo.save(newWorkout);
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutsRepo.find({ relations: ['author'] });
  }

  async findById(id: string): Promise<Workout | null> {
    return this.workoutsRepo.findOne({ where: { id }, relations: ['author'] });
  }

  async update(
    id: string,
    updateWorkoutDto: UpdateWorkoutDto
  ): Promise<Workout> {
    const workoutToUpdate = await this.findById(id);
    if (!workoutToUpdate) {
      throw new NotFoundException('Workout not found');
    }
    const updatedWorkout = Object.assign(workoutToUpdate, updateWorkoutDto);
    return this.workoutsRepo.save(updatedWorkout);
  }

  async delete(id: string): Promise<Workout> {
    const workoutToDelete = await this.findById(id);
    if (!workoutToDelete) {
      throw new NotFoundException('Workout not found');
    }
    await this.workoutsRepo.remove(workoutToDelete);
    return workoutToDelete;
  }
}
