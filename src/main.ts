import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
// docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres -> create container, map port, env variable & fetch from docker hub
// docker container stop posgres-nest -> stop the container
//docker container ls -> information
// docker container rm postrges-nest -> remove the container
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
