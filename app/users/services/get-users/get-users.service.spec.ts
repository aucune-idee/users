import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { GetusersService as GetUsersService } from './get-users.service';
import { UserCollectionName } from '../../schemas/user.schema';

let userModel = {};

describe('GetLobbiesService', () => {
  let service: GetUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUsersService,
      {
        provide:getModelToken(UserCollectionName),
        useValue:userModel
      }],
    }).compile();

    service = module.get<GetUsersService>(GetUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
