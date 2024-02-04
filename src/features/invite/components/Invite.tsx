import { DiscordRoutesEnum } from '@discord-ui/routes/route-decorators/DiscordRoutesEnum';
import { inviteActions, userSelectors } from '@discord-ui/store/store';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const Invite: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { guildId } = useParams<{ guildId: string }>();

  const user = useSelector(userSelectors.selectLoggedInUser);

  useEffect(() => {
    const joinGuild = async () => {
      try {
        if (!user) {
          //navigate(DiscordRoutesEnum.login);
          return;
        }
        if (guildId) {
          const guild = await dispatch(inviteActions.acceptJoinGuild({ guildId })).unwrap();

          //navigate(`${DiscordRoutesEnum.channels}/${guild._id}`);
        } else {
          //navigate(-1);
        }
      } catch (error) {
        console.log(error);
        //navigate(-1);
      }
    };

    joinGuild();
  }, [guildId]);

  return null;
};
