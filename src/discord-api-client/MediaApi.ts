import { AxiosInstance } from 'axios';
import { isEmpty, omitBy } from 'lodash';

export class MediaApi {
  constructor(protected readonly client: AxiosInstance) {}

  getMedia(
    mediaId?: string | null,
    defaultImage?: any,
    size?: 'mini' | 'small' | 'medium',
  ): string {
    if (isEmpty(mediaId)) {
      return defaultImage;
    }
    const qs = new URLSearchParams(omitBy({ size }, isEmpty) as Record<string, string>);
    return `${this.client.defaults.baseURL}/media/${mediaId}?${qs}`;
  }
}
