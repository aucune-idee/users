import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { CreateUserService } from './create-user.service';
import { UserCollectionName } from '../../schemas/user.schema';

import { ConfigService } from '../../../config/config.service';

import { EmailUtilsService } from "../../../shared/services/email-utils/email-utils.service";
import { PasswordUtilsService } from "../../../shared/services/password-utils/password-utils.service";


let userModel = {};

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, EmailUtilsService, PasswordUtilsService,
        CreateUserService,
      {
        provide:getModelToken(UserCollectionName),
        useValue:userModel
      }],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*it('Empty name to throw validation error', async () => {
      await expect(createLobby({})).rejects.toEqual(
          new BaseError("Name is invalid", ErrorCodes.LOBBY_INVALID_NAME)
      );
      await expect(createLobby({name:""})).rejects.toEqual(
          new BaseError("Name is invalid", ErrorCodes.LOBBY_INVALID_NAME)
      );
  });
  it('Empty type to throw validation error', async () => {
      await expect(createLobby({name:"Whatever"})).rejects.toEqual(
          new BaseError("Type is invalid", ErrorCodes.LOBBY_INVALID_TYPE)
      );
  });
  it('Empty owner to throw validation error', async () => {
      await expect(createLobby({name:"whatever", type: GameType.CLASSIC})).rejects.toEqual(
          new BaseError("Owner is invalid", ErrorCodes.LOBBY_INVALID_OWNER)
      );
  });
  it('All set should work', async () => {
      let input = {
          name: "whatever",
          type: GameType.CLASSIC,
          owner: 0
      };
      Lobby.create = jest.fn().mockImplementation((param)=>{
          return Promise.resolve(input);
      });
      await expect(createLobby(input)).resolves.toEqual(input);
  });*/
});
