import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from './config/config.service';

let config = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:config.envConfig.cors
  });
  await app.listen(config.envConfig.port);
}
bootstrap();
