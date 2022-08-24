export const isEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};
