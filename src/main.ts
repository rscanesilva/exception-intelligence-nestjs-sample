import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

// ── Inline SDK integration ────────────────────────────────────────────────
// In a real project: import from '@exception-intelligence/sdk-node'
// Here we reference the SDK source directly for easy testing.
import { createNestJsExceptionFilter, registerProcessHandlers } from '../../sdks/node/src';

const SDK_CONFIG = {
  serverUrl: 'http://localhost:8090',
  serviceName: 'nestjs-sample',
  environment: 'local',
  framework: 'nestjs',
  projectPaths: [__dirname],
};

@Module({ controllers: [AppController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SDK: NestJS global exception filter
  app.useGlobalFilters(createNestJsExceptionFilter(SDK_CONFIG));

  // SDK: uncaught process-level errors
  registerProcessHandlers(SDK_CONFIG);

  await app.listen(3001);
  console.log('NestJS sample running on http://localhost:3001');
  console.log('Endpoints: GET /test/ok | /test/type | /test/range | /test/custom?user=');
}

bootstrap();
