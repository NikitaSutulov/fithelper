import { Module } from '@nestjs/common';
import { HealthEntryService } from './health-entry.service';
import { HealthEntryController } from './health-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { HealthEntry } from './entities/health-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HealthEntry, User])],
  controllers: [HealthEntryController],
  providers: [HealthEntryService],
})
export class HealthEntryModule {}
