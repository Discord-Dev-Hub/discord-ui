import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';

import { loginApi } from '../service/api';
import { LoginDto } from '../service/dto/LoginDto';
import { LoginResponseDto } from '../service/dto/LoginResponseDto';

export const login = createDiscordThunk<LoginResponseDto, LoginDto, AsyncThunkConfig>(
  'user/register',
  async (dto: LoginDto) => loginApi.login(dto),
);

export const loginActions = {
  login,
};
