import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function TypeormConfig(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configService: ConfigService,
): TypeOrmModuleOptions {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  const connectionConfig = {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    ssl: false,
    logging: false,
  } as TypeOrmModuleOptions;

  return connectionConfig;
}
