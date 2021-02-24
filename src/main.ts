// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet = require('helmet');

import { logger } from './common/logger';
import { LoggingInterceptor } from './common/interceptors/';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production' ? logger : ['debug', 'error', 'log', 'verbose', 'warn'],
  });

  // app.use()   // 使用express的中间件与express相同;
  app.use(helmet());
  app.use(compression());

  // 静态资源目录
  app.useStaticAssets('./public');

  // 模板目录
  app.setBaseViewsDir('./views');
  app.setViewEngine('ejs');
  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  await app.listen(3000);

  console.log('listen on: http://127.0.0.1:3000');
}

bootstrap();
