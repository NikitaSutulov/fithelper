import { Test, TestingModule } from '@nestjs/testing';
import { HealthEntryService } from './health-entry.service';

describe('HealthEntryService', () => {
  let service: HealthEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthEntryService],
    }).compile();

    service = module.get<HealthEntryService>(HealthEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
