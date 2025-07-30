import { Test, TestingModule } from '@nestjs/testing';
import { WaterPortionService } from './water-portion.service';

describe('WaterPortionService', () => {
  let service: WaterPortionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterPortionService],
    }).compile();

    service = module.get<WaterPortionService>(WaterPortionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
