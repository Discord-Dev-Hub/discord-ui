import { User } from '@discord-ui/features/user/service/dto/User';
import { userSelectors } from '@discord-ui/store/store';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { DiscordRoutesEnum } from './DiscordRoutesEnum';

type AppRouteProps = {
  skipIfLoggedIn?: boolean;
  skipIfEmailVerified?: boolean;
  component: React.ReactElement;
};

export const AppRoute: React.FC<AppRouteProps> = ({
  component,
  skipIfLoggedIn = false,
  skipIfEmailVerified = false,
}) => {
  const { pathname } = useLocation();
  const loggedInUser = useSelector(userSelectors.selectLoggedInUser) as User;

  const whiteRoutes = [DiscordRoutesEnum.login, DiscordRoutesEnum.register];

  if (skipIfLoggedIn && loggedInUser) {
    return <Navigate to={DiscordRoutesEnum.home} replace />;
  }

  if (skipIfEmailVerified && loggedInUser) {
    return <Navigate to={DiscordRoutesEnum.home} replace />;
  }

  if (!loggedInUser && whiteRoutes.every((route) => !pathname.slice(1).includes(route.slice(1)))) {
    return <Navigate to={DiscordRoutesEnum.login} replace />;
  }

  return component;
};
