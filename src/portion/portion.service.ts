import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/dish/entities/dish.entity';
import {
  PortionDto,
  CreatePortionDto,
  UpdatePortionDto,
} from 'src/portion/dto';
import { Portion } from 'src/portion/entities/portion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortionService {
  constructor(
    @InjectRepository(Portion)
    private readonly portionsRepo: Repository<Portion>,
    @InjectRepository(Dish)
    private readonly dishesRepo: Repository<Dish>
  ) {}

  private toDto(portion: Portion): PortionDto {
    return {
      id: portion.id,
      dishId: portion.dish.id,
      grams: portion.grams,
    };
  }

  async create(createPortionDto: CreatePortionDto): Promise<PortionDto> {
    const dish = await this.dishesRepo.findOneBy({
      id: createPortionDto.dishId,
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    const newPortion = this.portionsRepo.create({
      dish,
      grams: createPortionDto.grams,
    });
    return this.toDto(await this.portionsRepo.save(newPortion));
  }

  async findAll(): Promise<PortionDto[]> {
    return (
      await this.portionsRepo.find({
        relations: ['dish'],
      })
    ).map(this.toDto);
  }

  // TODO: findByMealId()

  async findById(id: string): Promise<PortionDto | null> {
    const portion = await this.portionsRepo.findOne({
      where: { id },
      relations: ['dish'],
    });
    return portion ? this.toDto(portion) : null;
  }

  async update(
    id: string,
    updatePortionDto: UpdatePortionDto
  ): Promise<PortionDto> {
    const portionToUpdate = await this.portionsRepo.findOne({
      where: { id },
      relations: ['dish'],
    });
    if (!portionToUpdate) {
      throw new NotFoundException('Portion not found');
    }
    const updatedPortion = Object.assign(portionToUpdate, updatePortionDto);
    return this.toDto(await this.portionsRepo.save(updatedPortion));
  }

  async delete(id: string): Promise<PortionDto> {
    const portionToDelete = await this.findById(id);
    if (!portionToDelete) {
      throw new NotFoundException('Portion not found');
    }
    await this.portionsRepo.delete({ id });
    return portionToDelete;
  }
}
