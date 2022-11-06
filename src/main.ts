import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  NestApplicationOptions,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';

async function bootstrap() {
  const appOptions: NestApplicationOptions = {};
  const corsOptions: CorsOptions | CorsOptionsDelegate<any> = {};
  const validationOptions: ValidationPipeOptions = {
    transform: true,
    always: true,
    forbidUnknownValues: true,
  };

  const app = await NestFactory.create(AppModule, appOptions);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning();
  app.setGlobalPrefix('/api');

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('APP_PORT') ?? 3000;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pjson = require('../package.json');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Equati math games')
    .addTag('game', 'Endpoint to create new and fetch existing games.')
    .setDescription('Equati game API')
    .setTermsOfService('http://swagger.io/terms/')
    .setExternalDoc('Find out more about Swagger', 'http://swagger.io/')
    .setContact('Contact the developer', '', 'info@equati.de')
    .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
    .setVersion(pjson.version)
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-KEY',
        in: 'header',
      },
      'api-key',
    );
  if (config.get<string>('NODE_ENV') !== 'production') {
    swaggerConfig.addServer(`http://localhost:${port}`);
  }
  swaggerConfig.addServer('https://api.equati.de');

  const document = SwaggerModule.createDocument(app, swaggerConfig.build());
  SwaggerModule.setup('api', app, document);
  if (config.get<string>('NODE_ENV') !== 'production') {
    fs.writeFileSync(__dirname + '/../swagger.json', JSON.stringify(document));
  }
  await app.listen(port);
}
bootstrap().then();
