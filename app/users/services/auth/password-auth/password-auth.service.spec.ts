import { Test, TestingModule } from '@nestjs/testing';
import { PasswordAuthService } from './password-auth.service';
import { getModelToken } from '@nestjs/mongoose';

import { UserCollectionName } from '../../../schemas/user.schema';

import { PasswordUtilsService } from "../../../../shared/services/password-utils/password-utils.service";
import { ConfigService } from "../../../../config/config.service";

jest.mock('../../../../shared/services/password-utils/password-utils.service');
jest.mock('../../../../config/config.service');



let userModel = {};

describe('PasswordAuthService', () => {
  let service: PasswordAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordAuthService, PasswordUtilsService, ConfigService,
      {
        provide:getModelToken(UserCollectionName),
        useValue:userModel
      }],
    }).compile();

    service = module.get<PasswordAuthService>(PasswordAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
