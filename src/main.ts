import { NestFactory } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  // -- setup logger -----------------------
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  // -- security settings ------------------
  app.enableCors();
  const port = 3000;
  await app.listen(port);

  logger.log(`Application started listening on port "${port}"`, 'Bootstrap');
}
bootstrap();
