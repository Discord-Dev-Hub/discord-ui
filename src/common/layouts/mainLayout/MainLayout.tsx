import { userSelectors } from '@discord-ui/store/store';

import React from 'react';
import { useSelector } from 'react-redux';

import { GuildsSidebar } from './GuildsSidebar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector(userSelectors.selectLoggedInUser);
  return (
    <div className="w-full h-full flex">
      {user ? <GuildsSidebar /> : null}
      {children}
    </div>
  );
};
