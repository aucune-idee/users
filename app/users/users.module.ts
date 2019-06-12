import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersController } from './controllers/users.controller';
import { User, UserCollectionName } from './schemas/user.schema';
import { CreateUserService, GetusersService } from './services';
import { SharedModule } from '../shared/shared.module';
import { ConfigModule } from '../config/config.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { PasswordAuthService } from './services/auth/password-auth/password-auth.service';


@Module({
  imports: [SharedModule, ConfigModule,
     TypegooseModule.forFeature([User])],
  controllers: [UsersController, AuthController],
  providers: [CreateUserService, GetusersService, AuthService, PasswordAuthService]
})
export class UsersModule {}
