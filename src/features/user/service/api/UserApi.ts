import { discordApiClient } from '@discord-ui/discord-api-client';

import { User } from '../dto/User';

export class UserApi {
  getProfile(userId: string) {
    return discordApiClient.get<Required<User>>(`/user/${userId}`).then(({ data }) => data);
  }

  getAccessToken(userId: string) {
    return discordApiClient.get<string>(`/user/${userId}/refresh-token`).then(({ data }) => data);
  }
}
