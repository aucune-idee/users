import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { ConfigModule } from './config/config.module';


@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.envConfig.mongodbConnectChain,
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
