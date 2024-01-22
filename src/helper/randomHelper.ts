export const randomIntFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomItemFromArray = <T>(items: Array<T>): T => {
  const randoIndex = randomIntFromRange(0, items.length);
  return items[randoIndex];
}