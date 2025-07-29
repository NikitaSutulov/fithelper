import { Test, TestingModule } from '@nestjs/testing';
import { HealthEntryController } from './health-entry.controller';
import { HealthEntryService } from './health-entry.service';

describe('HealthEntryController', () => {
  let controller: HealthEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthEntryController],
      providers: [HealthEntryService],
    }).compile();

    controller = module.get<HealthEntryController>(HealthEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
