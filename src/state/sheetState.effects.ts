import { AtomEffect } from 'recoil';

/**
 * Effect that stores the value in a localStorage key
 * @param key
 */
export function localStorageEffect<T>(key: string): AtomEffect<T>  {
  return ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  }
}