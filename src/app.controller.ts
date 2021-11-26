import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {} from 'discord.js';

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
  async sendMessageToDiscord(
    @Param() params: SendMessageToDiscordParams,
  ): Promise<string> {
    await this.appService.sendMessage();
    return params.place;
  }
}
