import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(key);
  }

  getDatabaseConfig(): TypeOrmModuleOptions {
    const entitiesPath = path.join(__dirname, '**', '*.entity{.ts,.js}'); // Dynamic path for entities
    return {
      type: 'postgres', // Or 'mysql' if you're using MySQL
      host: this.get('DB_HOST'),
      port: parseInt(this.get('DB_PORT'), 10),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE'),
      entities: [entitiesPath], // Use dynamic path for entity discovery
      synchronize: this.get('DB_SYNCHRONIZE') === 'true', // Optional environment variable to control synchronization
      logging: true, // Optional: to enable logging
    };
  }
}
