import { Module } from '@nestjs/common';

import { PasswordUtilsService } from './services/password-utils/password-utils.service';
import { EmailUtilsService } from './services/email-utils/email-utils.service';

import { ConfigModule } from '../config/config.module';


@Module({
  imports: [ConfigModule,],
  providers: [PasswordUtilsService, EmailUtilsService],
  exports: [PasswordUtilsService, EmailUtilsService]
})
export class SharedModule {}
