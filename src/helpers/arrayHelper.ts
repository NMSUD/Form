export const makeArrayOrDefault = <T>(
  propsVal?: T | Array<T>,
  defaultValue: Array<T> = [],
): Array<T> => {
  if (propsVal == null) return defaultValue;
  if (Array.isArray(propsVal) == true) return [...propsVal];

  // make array of whatever is passed in
  return [propsVal];
};
