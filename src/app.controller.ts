import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

interface SendMessageToDiscordParams {
  place: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sendMessageToDiscord/:place')
  sendMessageToDiscord(@Param() params: SendMessageToDiscordParams): string {
    return params.place;
  }
}
