import {
  UnauthorizedException,
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';

interface Headers {
  authorization: string;
}
interface OrderItem {
  item: {
    category: {
      needsPreparation: boolean;
    };
  };
}
export interface SendMessageToDiscordBody {
  order: {
    status: 'ready' | 'pending' | 'preparing' | 'finished';
    place: string;
    orderItems: OrderItem[];
  };
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
    @Headers() headers: Headers,
  ): Promise<void> {
    if (
      (headers?.authorization || '').split('Bearer ')[1] !==
      process.env.PRIVATE_KEY
    ) {
      throw new UnauthorizedException('No private key provided');
    }

    await this.appService.sendMessage(body);
  }
}
