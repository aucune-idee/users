import { Test, TestingModule } from '@nestjs/testing';
import { EmailUtilsService } from './email-utils.service';

describe('EmailUtilsService', () => {
  let service: EmailUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailUtilsService],
    }).compile();

    service = module.get<EmailUtilsService>(EmailUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
