import { discordApiClient } from '@discord-ui/discord-api-client';

import { LoginDto } from '../dto/LoginDto';
import { LoginResponseDto } from '../dto/LoginResponseDto';

export class LoginApi {
  login(dto: LoginDto) {
    return discordApiClient.post<LoginResponseDto>(`/user/login`, dto).then(({ data }) => data);
  }
}
