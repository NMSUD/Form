export const makeArrayOrDefault = <T>(
  propsVal?: T | Array<T>,
  defaultValue: Array<T> = [],
): Array<T> => {
  if (propsVal == null) return defaultValue;
  if (Array.isArray(propsVal) == true) return [...propsVal];

  if (propsVal != null) return [propsVal];
  return defaultValue;
};
