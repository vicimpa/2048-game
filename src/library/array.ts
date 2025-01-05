export const from = <T>(length: number, value: T | ((index: number) => T)) => {
  return Array.from(
    { length },
    value instanceof Function ? (
      (_, i) => value(i)
    ) : () => value
  );
};

export const randitem = <T>(array: T[]): T => {
  return array[Math.random() * array.length | 0];
};