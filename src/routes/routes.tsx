import { Home, Login, Register } from '@discord-ui/features';
import { Guild } from '@discord-ui/features/guild/components/Guild';

import { RouteObject } from 'react-router-dom';

import { AppRoute } from './route-decorators/AppRoute';
import { DiscordRoutesEnum } from './route-decorators/DiscordRoutesEnum';

export const routes = [
  {
    path: `${DiscordRoutesEnum.login}`,
    element: <AppRoute skipIfLoggedIn component={<Login />} />,
  },
  {
    path: `${DiscordRoutesEnum.register}`,
    element: <AppRoute skipIfLoggedIn component={<Register />} />,
  },
  { path: `${DiscordRoutesEnum.channels}/:guildId/*`, element: <AppRoute component={<Guild />} /> },
  { path: '/*', element: <AppRoute component={<Home />} /> },
] as RouteObject[];
