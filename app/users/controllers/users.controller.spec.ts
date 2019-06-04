import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

import { CreateUserService, GetusersService} from '../services';

jest.mock('../services/')

describe('Lobbies Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {provide:CreateUserService, useValue: new CreateUserService(null, null, null, null)},
        {provide:GetusersService, useValue: new GetusersService(null)},
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
