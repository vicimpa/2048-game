export const value = (x = 0, y = 0, v = 2) => {
  return {
    ['--x']: x,
    ['--y']: y,
    ['--val']: `'${v}'`
  } as any
}