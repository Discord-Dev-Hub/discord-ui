import { discordApiClient } from '@discord-ui/discord-api-client';
import { Guild } from '@discord-ui/features/guild/service/dto/Guild';

export class InviteApi {
  acceptJoinGuild(guildId: string) {
    return discordApiClient.post<Guild>(`/guilds/${guildId}/invite`).then(({ data }) => data);
  }
}
