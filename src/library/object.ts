export const { entries, keys, values } = Object as {
  entries<T extends object>(obj: T): [keyof T, T[keyof T]][];
  keys<T extends object>(obj: T): (keyof T)[];
  values<T extends object>(obj: T): T[keyof T][];
};