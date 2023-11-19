import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';

import { registerApi } from '../service/api';
import { RegisterDto } from '../service/dto/RegisterDto';
import { RegisterResponseDto } from '../service/dto/RegisterResponseDto';

export const register = createDiscordThunk<
  RegisterResponseDto & { message: string; statusCode: number },
  RegisterDto,
  AsyncThunkConfig
>('user/register', async (dto: RegisterDto) => {
  const res = await registerApi.register(dto);

  return { ...res, message: 'Successfully registered', statusCode: 200 };
});

export const registerActions = {
  register,
};
