import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

const getDataSourceOptions = (config: ConfigService): DataSourceOptions => {
  let username = config.get<string>('DB_USER_FILE');
  if (username !== undefined) {
    username = fs.readFileSync(username).toString('utf8');
  } else {
    username = config.get<string>('DB_USER');
  }
  let password = config.get<string>('DB_PASS_FILE');
  if (password) {
    password = fs.readFileSync(password).toString('utf8');
  } else {
    password = config.get<string>('DB_PASS');
  }
  return {
    type: 'postgres' as const,
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    database: config.get<string>('DB_NAME'),
    username,
    password,
    // https://stackoverflow.com/a/59607836
    entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
    migrations: [join(__dirname, '..', '**', 'migrations', '*.{js,ts}')],
    //cli: {
    //  migrationsDir: join(__dirname, '..', '**', 'migrations'),
    //},
    //logging: true,
    //logger: 'file',
    // https://docs.nestjs.com/techniques/database#auto-load-entities
    useUTC: true,
    synchronize: config.get<string>('NODE_ENV') !== 'production', // never use TRUE in production!
    dropSchema: config.get<string>('NODE_ENV') === 'development',
  };
};

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): DataSourceOptions {
    return getDataSourceOptions(this.config);
  }
}

// Used by the CLI for migrations
config();
const configService = new ConfigService();
export default new DataSource(getDataSourceOptions(configService));
