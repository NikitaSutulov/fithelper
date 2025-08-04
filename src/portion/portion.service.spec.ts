import { Test, TestingModule } from '@nestjs/testing';
import { PortionService } from './portion.service';

describe('PortionService', () => {
  let service: PortionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortionService],
    }).compile();

    service = module.get<PortionService>(PortionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
