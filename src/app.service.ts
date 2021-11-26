import { Injectable } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
import axios from 'axios';
@Injectable()
export class AppService {
  private client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] });

  getHello(): string {
    return 'Hello World!';
  }

  async getUserDiscordIdFromUAApi(place: string): Promise<string> {
    const { data } = await axios.get(
      `https://arena.dev.uttnetgroup.fr/api/admin/users?place=${place}`,
    );

    return data.discordId;
  }

  async sendMessage(place: string): Promise<string> {
    await this.client.login('SECRET');

    const discordId = await this.getUserDiscordIdFromUAApi(place);

    const user = await this.client.users.fetch(discordId);

    await user.send('CA MARCHE');

    return '';
  }
}
