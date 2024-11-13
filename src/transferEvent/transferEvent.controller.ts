import { Controller, Get, Query } from '@nestjs/common';
import { TokenService } from './transferToken.service';

@Controller('events')
export class EventsController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async getEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [events, total] = await this.tokenService.getEvents(page, limit);
    return {
      data: events,
      total,
      page,
      limit,
    };
  }
}
