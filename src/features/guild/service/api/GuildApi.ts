import { discordApiClient } from '@discord-ui/discord-api-client';

import { CreateGuildDto } from '../dto/CreateGuildDto';
import { Guild } from '../dto/Guild';
import { GuildMember } from '../dto/GuildMember';

export class GuildApi {
  createGuild(dto: CreateGuildDto) {
    const formData = new FormData();
    const { name, image } = dto;

    if (image) {
      formData.set('image', image);
    }

    formData.set('name', name);

    return discordApiClient.post<Guild>(`/guilds`, formData).then(({ data }) => data);
  }

  getGuilds(userId: string) {
    return discordApiClient
      .get<Required<Guild[]>>(`/user/${userId}/guilds`)
      .then(({ data }) => data);
  }

  getGuildMembers(guildId: string) {
    return discordApiClient
      .get<Required<GuildMember[]>>(`/guilds/${guildId}/members`)
      .then(({ data }) => data);
  }

  getGuildById(guildId: string) {
    return discordApiClient.get<Required<Guild>>(`/guilds/${guildId}`).then(({ data }) => data);
  }
}
