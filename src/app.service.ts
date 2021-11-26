import { Injectable } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
@Injectable()
export class AppService {
  private client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] });

  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(): Promise<string> {
    await this.client.login('SECRET');
    const user = await this.client.users.fetch('ID');

    await user.send('TU VEUX VOIR MA B***');

    return '';
  }
}
