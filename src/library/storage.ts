export const storage = <T>(
  key: string,
  toValue: (v: string | null) => T,
  toStore: (v: T) => string
) => {

  return {
    restore() {
      return toValue(localStorage.getItem(key));
    },
    store(v: T) {
      localStorage.setItem(key, toStore(v));
    }
  };
};