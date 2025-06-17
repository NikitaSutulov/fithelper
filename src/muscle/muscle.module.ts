import { Module } from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { MuscleController } from './muscle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muscle } from './entities/muscle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Muscle])],
  controllers: [MuscleController],
  providers: [MuscleService],
  exports: [MuscleService],
})
export class MuscleModule {}
