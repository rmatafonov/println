export const mathUtil = {
  getRandomInt: (max: number): number => Math.random() * max,

  getRandomArbitrary: (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min)
}
