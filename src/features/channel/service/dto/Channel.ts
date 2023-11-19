import { ChannelTypes } from '../constants/ChannelTypes';

export interface Channel {
  _id: string;
  name: string;
  guildId: string;
  type: ChannelTypes;
  createdAt: Date;
  updatedAt: Date;
}
