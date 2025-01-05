export const lerp = (value: number, from: number, to: number) => {
  return (to - from) * value + from;
};