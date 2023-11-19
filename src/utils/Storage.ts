import JsCookie from 'js-cookie';

/**
 * Uses cookies for browser and localStorage for electron
 */
export class Storage {
  static set(key: string, value: string) {
    return JsCookie.set(key, value, { expires: 7 });
  }

  static get<T extends string>(key: string) {
    return JsCookie.get(key) as T;
  }

  static remove(key: string) {
    return JsCookie.remove(key);
  }
}
