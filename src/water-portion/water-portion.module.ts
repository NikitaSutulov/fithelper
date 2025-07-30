import { Module } from '@nestjs/common';
import { WaterPortionService } from './water-portion.service';
import { WaterPortionController } from './water-portion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterPortion } from './entities/water-portion.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterPortion, HealthEntry])],
  controllers: [WaterPortionController],
  providers: [WaterPortionService],
})
export class WaterPortionModule {}
