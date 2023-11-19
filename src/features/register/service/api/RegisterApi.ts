import { discordApiClient } from '@discord-ui/discord-api-client';

import { RegisterDto } from '../dto/RegisterDto';
import { RegisterResponseDto } from '../dto/RegisterResponseDto';

export class RegisterApi {
  register(dto: RegisterDto) {
    return discordApiClient
      .post<RegisterResponseDto>('/user/register', dto)
      .then(({ data }) => data);
  }
}
