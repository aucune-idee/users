import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';


@Module({
  imports: [ TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.envConfig.mongodbConnectChain,
      useNewUrlParser: true,
      bufferCommands: false
    })
  }), UsersModule, SharedModule, ConfigModule],
  controllers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
