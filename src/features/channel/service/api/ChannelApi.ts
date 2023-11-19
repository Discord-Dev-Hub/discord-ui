import { discordApiClient } from '@discord-ui/discord-api-client';

import { Channel } from '../dto/Channel';
import { CreateChannelDto } from '../dto/CreateChannelDto';

export class ChannelApi {
  createChannel(guildId: string, dto: CreateChannelDto) {
    return discordApiClient
      .post<Channel>(`/guilds/${guildId}/channels`, dto)
      .then(({ data }) => data);
  }

  getGuildChannels(guildId: string) {
    return discordApiClient
      .get<Required<Channel[]>>(`/guilds/${guildId}/channels`)
      .then(({ data }) => data);
  }
}
