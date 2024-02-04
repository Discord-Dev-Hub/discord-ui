import { Channel, ChannelEmpty } from '@discord-ui/features';

import { RouteObject } from 'react-router-dom';

export const routes = [
  {
    path: `:channelId`,
    element: <Channel />,
  },
  {
    path: '*',
    element: <ChannelEmpty />,
  },
] as RouteObject[];
