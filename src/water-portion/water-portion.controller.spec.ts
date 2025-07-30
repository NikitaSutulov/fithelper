import { Test, TestingModule } from '@nestjs/testing';
import { WaterPortionController } from './water-portion.controller';
import { WaterPortionService } from './water-portion.service';

describe('WaterPortionController', () => {
  let controller: WaterPortionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterPortionController],
      providers: [WaterPortionService],
    }).compile();

    controller = module.get<WaterPortionController>(WaterPortionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
