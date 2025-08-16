import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDishDto, DishDto, UpdateDishDto } from './dto';
import { Dish } from './entities/dish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishesRepo: Repository<Dish>
  ) {}

  async create(createDishDto: CreateDishDto): Promise<DishDto> {
    const newDish = this.dishesRepo.create(createDishDto);
    return this.dishesRepo.save(newDish);
  }

  async findAll(): Promise<DishDto[]> {
    return this.dishesRepo.find();
  }

  async findById(id: string): Promise<DishDto | null> {
    return this.dishesRepo.findOneBy({ id });
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<DishDto> {
    const dishToUpdate = await this.findById(id);
    if (!dishToUpdate) {
      throw new NotFoundException('Dish not found');
    }
    const updatedDish = Object.assign(dishToUpdate, updateDishDto);
    return this.dishesRepo.save(updatedDish);
  }

  async delete(id: string): Promise<DishDto> {
    const dishToDelete = await this.findById(id);
    if (!dishToDelete) {
      throw new NotFoundException('Dish not found');
    }
    await this.dishesRepo.delete({ id });
    return dishToDelete;
  }
}
