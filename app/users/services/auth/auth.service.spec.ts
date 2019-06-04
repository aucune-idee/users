import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { PasswordAuthService } from "./password-auth/password-auth.service";
jest.mock('./password-auth/password-auth.service');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PasswordAuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
