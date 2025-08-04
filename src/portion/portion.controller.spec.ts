import { Test, TestingModule } from '@nestjs/testing';
import { PortionController } from './portion.controller';
import { PortionService } from './portion.service';

describe('PortionController', () => {
  let controller: PortionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortionController],
      providers: [PortionService],
    }).compile();

    controller = module.get<PortionController>(PortionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
