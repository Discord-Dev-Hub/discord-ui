import { useRoutes } from 'react-router-dom';

import { GuildLayout } from '../layouts/GuildLayout';
import { routes } from '../routes/routes';

export const Guild: React.FC = () => {
  const appRoutes = useRoutes(routes);

  return <GuildLayout>{appRoutes}</GuildLayout>;
};
