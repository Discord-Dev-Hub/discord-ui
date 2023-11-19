import { UserApi } from '@discord-ui/features/user/service/api/UserApi';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';

import { MediaApi } from './MediaApi';

export class DiscordApiClient {
  private readonly client: AxiosInstance;

  user: UserApi;
  media: MediaApi;

  constructor(
    public baseURL?: string,
    public accessToken?: string,
  ) {
    this.client = axios.create({ baseURL });

    this.client.interceptors.request.use((config) => {
      if (!config.headers.has('discord-correlation-id')) {
        config.headers.set('discord-correlation-id', uuid());
      }
      return config;
    });

    this.updateToken(accessToken);

    this.user = new UserApi();
    this.media = new MediaApi(this.client);
  }

  updateBaseURL(baseURL: string) {
    this.baseURL = baseURL;
    this.client.defaults.baseURL = baseURL;
  }

  updateToken(accessToken?: string) {
    this.accessToken = accessToken;

    if (isEmpty(accessToken)) {
      delete this.client.defaults.headers.common.Authorization;
    } else {
      this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }

  getToken(userId: string) {
    return this.user.getAccessToken(userId);
  }

  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<R> {
    return this.client.get(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.post(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.patch(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.put(url, data, config);
  }
}
