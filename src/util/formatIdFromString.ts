export const formatIdFromString = (str: string): string => (
  str.replace(/\s/g, '_').toLowerCase()
);
