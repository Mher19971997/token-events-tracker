import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import * as path from 'path';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../.env'),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
