import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenService } from './transferEvent/transferToken.service';
import { EventsController } from './transferEvent/transferEvent.controller';
import { TransferEvent } from './transferEvent/transferEvent.entity';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getDatabaseConfig(),
    }),
    TypeOrmModule.forFeature([TransferEvent]),
  ],
  controllers: [EventsController],
  providers: [TokenService],
})
export class AppModule {}
