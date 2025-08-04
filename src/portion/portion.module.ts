import { Module } from '@nestjs/common';
import { PortionService } from './portion.service';
import { PortionController } from './portion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portion } from './entities/portion.entity';
import { Dish } from 'src/dish/entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portion, Dish])],
  controllers: [PortionController],
  providers: [PortionService],
})
export class PortionModule {}
