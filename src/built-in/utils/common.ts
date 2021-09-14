export const isNil = <T>(value: T): boolean => {
  return value === null || value === undefined;
};

export const hasOwnProperty = <T, K extends keyof T>(object: T, key: K): boolean => {
  return Object.prototype.hasOwnProperty.call(object, key);
};
