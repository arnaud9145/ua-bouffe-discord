import { Injectable } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
import axios from 'axios';
import { SendMessageToDiscordBody } from './app.controller';

@Injectable()
export class AppService {
  private client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] });

  getHello(): string {
    return 'Hello World!';
  }

  async getUserDiscordIdFromUAApi(place: string): Promise<string> {
    const token = process.env.UA_API_ADMIN_TOKEN;

    const { data } = await axios.get(
      `${process.env.UA_API_URI}?place=${place}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (data.users.length === 0) return null;

    return data.users[0].discordId;
  }

  async sendMessage({
    order: { status, place, orderItems },
  }: SendMessageToDiscordBody): Promise<void> {
    // ATM, only send message when order is 'ready'
    if (status !== 'ready') return;
    if (place[0] === 'Z') return;

    // Send message if one of ordered item needs preperation
    // For example, soda can does not need preparation. Pizza does.
    if (
      !orderItems.some((orderItem) => orderItem.item.category.needsPreparation)
    )
      return;

    await this.client.login(process.env.DISCORD_BOT_API_TOKEN);

    const discordId = await this.getUserDiscordIdFromUAApi(place);

    if (!discordId) return;

    const user = await this.client.users.fetch(discordId);

    await user.send("Ta commande à la cantine de l'UA est prête !");

    return;
  }
}
