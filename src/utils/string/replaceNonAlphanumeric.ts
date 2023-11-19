import { replace } from 'lodash';

export const replaceNonAlphanumeric = (name: string) =>
  replace(replace(name, /^[^a-zA-Z0-9]+/, ''), /[^a-zA-Z0-9]+/g, '-');
