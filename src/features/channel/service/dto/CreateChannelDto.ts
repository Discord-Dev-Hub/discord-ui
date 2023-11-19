import { ChannelTypes } from '../constants/ChannelTypes';

export interface CreateChannelDto {
  name: string;
  type: ChannelTypes;
}
