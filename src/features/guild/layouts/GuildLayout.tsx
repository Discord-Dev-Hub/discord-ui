import { userSelectors } from '@discord-ui/store/store';

import React from 'react';
import { useSelector } from 'react-redux';

import { ChannelsSidebar } from '../components/ChannelsSidebar';

export const GuildLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector(userSelectors.selectLoggedInUser);
  return (
    <div className="w-full h-full flex">
      {user ? <ChannelsSidebar /> : null}
      {children}
    </div>
  );
};
