import { Guild } from '@discord-ui/features/guild/service/dto/Guild';
import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';

import { inviteApi } from '../service/api';

export const acceptJoinGuild = createDiscordThunk<Guild, { guildId: string }, AsyncThunkConfig>(
  'guild/invite/join',
  async ({ guildId }) => inviteApi.acceptJoinGuild(guildId),
);

export const inviteActions = {
  acceptJoinGuild,
};
