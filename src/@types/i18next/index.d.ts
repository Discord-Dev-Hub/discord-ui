import { defaultNS, resources } from './i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
  // FIXME temp (hopefully) fix for TS2589: Type instantiation is excessively deep and possibly infinite.
  declare function useTranslation(...params: any[] = undefined, options?: {keyPrefix?: string}): {
    t: (str: string, ...params: any[]) => string;
  };
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

