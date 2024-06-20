export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const promiseFrom = <T>(result: T, time: number = 0): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, time);
  });
