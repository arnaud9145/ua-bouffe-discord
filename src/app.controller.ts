import { UnauthorizedException, Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import {} from 'discord.js';

interface Headers {
  Authorization: string;
}
interface OrderItem {
  item: {
    category: {
      needsPreparation: boolean;
    }
  }
}
export interface SendMessageToDiscordBody {
  status: 'ready' | 'pending' | 'preparing' | 'finished';
  place: string;
  orderItems: OrderItem[];
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sendMessageToDiscord')
  async sendMessageToDiscord(
    @Body() body: SendMessageToDiscordBody,
    @Headers() headers: Headers
  ): Promise<string> {
    if ((headers?.Authorization || '').split('Bearer ')[1] !== process.env.PRIVATE_KEY) {
      throw new UnauthorizedException('No private key provided');
    }

    await this.appService.sendMessage(body);
    return body.place;
  }
}
