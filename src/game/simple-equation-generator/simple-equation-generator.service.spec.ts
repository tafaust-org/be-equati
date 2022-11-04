import { Test, TestingModule } from '@nestjs/testing';
import { SimpleEquationGeneratorService } from './simple-equation-generator.service';

describe('SimpleEquationGeneratorService', () => {
  let service: SimpleEquationGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimpleEquationGeneratorService],
    }).compile();

    service = module.get<SimpleEquationGeneratorService>(SimpleEquationGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
