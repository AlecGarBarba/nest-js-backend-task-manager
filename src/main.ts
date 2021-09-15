import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
// docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres -> create container, map port, env variable & fetch from docker hub
// docker container stop posgres-nest -> stop the container
//docker container ls -> information
// docker container rm postrges-nest -> remove the container
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
  console.log('listening on port 3000');
}
bootstrap();
